using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using Domain.Enum;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;

namespace Application.WishList.Items
{
    public class AddToCart
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).Equals(Guid.Empty);
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var wishlist = _context.WishLists.Include(x => x.Items)
                    .FirstOrDefault(
                        x => x.Id == Guid.Parse(_httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)
                        ));


                if (wishlist != null)
                {
                    var cart = _context.Carts.Include(x => x.Items)
                        .FirstOrDefault(
                            x => x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

                    var item = wishlist.Items.FirstOrDefault(x => x.Id == request.Id);

                    if (cart == null)
                    {
                        cart = new Cart()
                        {
                            Id = _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier),
                            Items = new List<Item>()
                        };
                        await _context.Carts.AddAsync(cart);
                    }
                    cart?.Items.Add(item);
                    var result = _context.SaveChanges();
                    if (result > 0)
                    {
                        wishlist.Items.Remove(item);
                        _context.SaveChanges();
                    }
                    else
                    {
                        return Result<Unit>.Failure("Add to cart failed");
                    }
                }
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}