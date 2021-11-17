using System;
using System.Collections.Generic;
using System.Linq;
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
        public class Command : IRequest<Result<Unit>>
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

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IHttpContextAccessor httpContext, IMapper mapper)
            {
                _context = context;
                _httpContext = httpContext;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // CHECK COUPON
                if (request.OrderParams.Coupon != null)
                {
                    var coupon = await _context.Coupons.Include(x => x.Books)
                        .SingleOrDefaultAsync((x) =>
                            x.Code == request.OrderParams.Coupon.Code.Trim() && x.IsDeleted == false);
                    if (coupon == null)
                    {
                        return Result<Unit>.Failure("Coupon is not exist");
                    }

                    if (DateTime.Now > coupon.ExpireDate)
                    {
                        return Result<Unit>.Failure("Coupon is expired");
                    }

                    foreach (var item in request.OrderParams.Coupon.Items)
                    {
                        var checkProductId = coupon.Books.SingleOrDefault((x) => x.BookId == item.ProductId);
                        if (checkProductId == null || item.Price * item.Quantity < coupon.MinSpend)
                        {
                            return Result<Unit>.Failure("Coupon is not valid");
                        }
                    }
                }

                //Get list item 
                var items = _context.Items.Where(x => request.OrderParams.ItemIds.Contains(x.Id.ToString()));

                // CHECK QUANTITY
                // foreach (var item in items)
                // {
                //     var bookAttribute = _context.BookAttributes
                //         .SingleOrDefault(x => x.BookId == item.ProductId && x.AttributeId == item.AttributeId);
                //     if (bookAttribute == null || bookAttribute.TotalStock < item.Quantity)
                //     {
                //         return Result<Unit>.Failure("Not valid ...");
                //     }
                //
                //     bookAttribute.TotalStock -= item.Quantity;
                //     
                //     // handle total stock status
                //     if (bookAttribute.TotalStock == 0)
                //     {
                //         bookAttribute.StockStatus = StockStatus.OutOfStock;
                //     }
                // }
                
                
                var order = new Order()
                {
                    Id = new Guid(),
                    OrderDate = DateTime.Now,
                    Status = (int) Status.Processing,
                    PaymentMethod = (int) PaymentMethod.CashOnDelivery,
                    SubTotal = items.Select(x => x.Price).Sum(),
                    OrderNote = request.OrderParams.OrderNote,
                    UserId = new Guid(_httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)),
                    AddressToShip = _context.Addresses.FirstOrDefault(x => x.Id == request.OrderParams.AddressId),
                    DeliveryMethod = _context.DeliveryMethods.FirstOrDefault(),
                    Items = new List<Item>()
                };

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
                await _context.SaveChangesAsync();
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}