using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Coupons;
using AutoMapper;
using Domain;
using Domain.Enum;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class Upsert
    {
        public class Command : IRequest<Result<Guid>>
        {
            public OrderParams OrderParams { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.OrderParams).SetValidator(new OrderValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Guid>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;

            }

            public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Get list item 
                var items = await _context.Items.Where(x => request.OrderParams.ItemIds.Contains(x.Id.ToString())).ToListAsync();

                // Check quantity
                foreach (var item in items)
                {
                    var bookAttribute = _context.BookAttributes
                        .SingleOrDefault(x => x.BookId == item.ProductId && x.AttributeId == item.AttributeId);
                    if (bookAttribute == null || bookAttribute.TotalStock < item.Quantity)
                    {
                        return Result<Guid>.Failure("Book is out of stock");
                    }

                    bookAttribute.TotalStock -= item.Quantity;

                    // handle total stock status
                    if (bookAttribute.TotalStock == 0)
                    {
                        bookAttribute.StockStatus = StockStatus.OutOfStock;
                    }
                }

                var order = new Order()
                {
                    Id = new Guid(),
                    OrderDate = DateTime.Now,
                    Status = _context.OrderStatus.FirstOrDefault(x => x.Key == "ready_to_pick")?.Name,
                    PaymentMethod = request.OrderParams.PaymentMethod,
                    PaymentStatus = PaymentStatus.Pending,
                    SubTotal = items.Select(x => x.Price * x.Quantity).Sum(),
                    OrderFee = request.OrderParams.OrderFee,
                    OrderNote = request.OrderParams.OrderNote,
                    UserId = new Guid(_httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    AddressToShip = request.OrderParams.Address,
                    Items = new List<Item>()
                };

                // CHECK COUPON
                if (!string.IsNullOrWhiteSpace(request.OrderParams.CouponId))
                {
                    var coupon = await _context.UserCoupons.Include(x => x.Coupon)
                        .SingleOrDefaultAsync((x) =>
                            x.Coupon.Id.ToString().ToLower() == request.OrderParams.CouponId.ToLower() && x.Coupon.IsDeleted == false && x.IsUsed == false);
                    if (coupon == null)
                    {
                        return Result<Guid>.Failure("Coupon is not exist");
                    }

                    if (coupon.Coupon.DiscountType == (int) DiscountType.Percentage)
                    {
                        order.SubTotal = Math.Round(order.SubTotal - (coupon.Coupon.CouponAmount * order.SubTotal) / 100 , 2) ;
                    }
                    else if (coupon.Coupon.DiscountType == (int) DiscountType.FixedCart)
                    {
                        order.SubTotal = Math.Round(order.SubTotal - coupon.Coupon.CouponAmount , 2) ;
                    }
                    order.Coupon = coupon.Coupon;
                }

                var cart = _context.Carts.Include(x => x.Items)
                    .FirstOrDefault(
                        x => x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
                if (cart != null)
                    foreach (var item in items)
                    {
                        if (cart.Items.Contains(item))
                        {
                            cart.Items.Remove(item);
                            order.Items.Add(item);
                        }
                    }

                await _context.Orders.AddAsync(order);
              

                //Remove coupon in user coupons
                if (order.Coupon != null)
                {
                    var userCoupon = _context.UserCoupons.FirstOrDefault(x =>
                        x.CouponId == order.Coupon.Id && x.UserId == order.UserId.ToString());

                    if (userCoupon != null)
                    {
                        userCoupon.IsUsed = true;
                    }
                  
                }
                
                var result = await _context.SaveChangesAsync() > 0;

                if (result == false)
                {
                    return Result<Guid>.Failure("Error when create order");
                }

                return Result<Guid>.Success(order.Id);
            }
        }
    }
}