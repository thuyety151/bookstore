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

namespace Application.Carts.Items
{
    public class Upsert
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ItemParams ItemParams { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ItemParams).SetValidator(new ItemValidator());
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
                var cart = _context.Carts.Include(x => x.Items)
                    .FirstOrDefault(
                        x => x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

                if (cart == null)
                {
                    cart = new Cart()
                    {
                        Id = _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier),
                        Items = new List<Item>()
                    };

                }

                var item = cart.Items.FirstOrDefault(x => x.ProductId == request.ItemParams.ProductId);
                
                var book = _context.Books.AsNoTracking().Include(x => x.Attributes).FirstOrDefault(x => x.Id == request.ItemParams.ProductId);

                if (book == null)
                {
                    return Result<Unit>.Failure("Book does not exist");
                }

                var totalStock = book.GetTotalStock();

                if (request.ItemParams.Quantity > totalStock)
                {
                    return Result<Unit>.Failure("Books in stock is not enough");
                }
                
                //Add
                if (item == null)
                {
                    var newItem = new Item()
                    {
                        Id = new Guid(),
                        ProductId = request.ItemParams.ProductId,
                        ProductName = request.ItemParams.ProductName,
                        AuthorId = request.ItemParams.AuthorId,
                        AuthorName = request.ItemParams.AuthorName,
                        PictureUrl = request.ItemParams.PictureUrl,
                        Price = request.ItemParams.Price,
                        Quantity = request.ItemParams.Quantity,
                        StockStatus = (int) StockStatus.InStock

                    };
                    cart.Items.Add(newItem);
                }
                //Update 
                else
                {
                    var index = cart.Items.IndexOf(item);
                    cart.Items.ElementAt(index).Quantity = request.ItemParams.Quantity;
                }

                await _context.SaveChangesAsync();

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}