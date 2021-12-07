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
                var items = _context.Items.Where(x => request.OrderParams.ItemIds.Contains(x.Id.ToString()));

                // Check quantity
                foreach (var item in items)
                {
                    var bookAttribute = _context.BookAttributes
                        .SingleOrDefault(x => x.BookId == item.ProductId && x.AttributeId == item.AttributeId);
                    if (bookAttribute == null || bookAttribute.TotalStock < item.Quantity)
                    {
                        return Result<Guid>.Failure("Not valid ...");
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
                    Status = _context.OrderStatus.FirstOrDefault(x => x.Key == "ready_to_pick")?.Name ,
                    PaymentMethod = (int) PaymentMethod.CashOnDelivery,
                    SubTotal = items.Select(x => x.Price * x.Quantity).Sum(),
                    OrderNote = request.OrderParams.OrderNote,
                    UserId = new Guid(_httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    AddressToShip = _context.Addresses.FirstOrDefault(x => x.Id == request.OrderParams.AddressId),
                    Items = new List<Item>()
                };
                
                // CHECK COUPON
                if (request.OrderParams.Coupon != null)
                {
                    var coupon = await _context.Coupons.Include(x => x.Books)
                        .SingleOrDefaultAsync((x) =>
                            x.Code.ToLower() == request.OrderParams.Coupon.Code.Trim().ToLower() && x.IsDeleted == false);
                    if (coupon == null)
                    {
                        return Result<Guid>.Failure("Coupon is not exist");
                    }

                    if (DateTime.Now > coupon.ExpireDate)
                    {
                        return Result<Guid>.Failure("Coupon is expired");
                    }

                    if (coupon.DiscountType == (int)DiscountType.Percentage)
                    {
                        order.SubTotal = order.SubTotal - (coupon.CouponAmount * order.SubTotal) / 100;
                    }
                    else if (coupon.DiscountType == (int) DiscountType.FixedCart)
                    {
                        order.SubTotal = order.SubTotal - coupon.CouponAmount;
                    }
                    
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