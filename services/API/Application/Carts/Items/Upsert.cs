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
                    await _context.Carts.AddAsync(cart);
                }

                var item = cart.Items.FirstOrDefault(x =>
                    x.ProductId == request.ItemParams.ProductId && x.AttributeId == request.ItemParams.AttributeId);

                var bookAttribute = _context.BookAttributes.Include(x => x.Attribute)
                    .Include(x => x.Book).ThenInclude(x => x.Author)
                    .Include(x => x.Book).ThenInclude(x => x.Media)
                    .AsNoTracking().FirstOrDefault(x =>
                        x.BookId == request.ItemParams.ProductId && x.AttributeId == request.ItemParams.AttributeId);

                if (bookAttribute == null)
                {
                    return Result<Unit>.Failure("Book does not exist");
                }

                var totalStock = bookAttribute.TotalStock;

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
                        ProductId = bookAttribute.BookId,
                        ProductName = bookAttribute.Book.Name,
                        AuthorId = bookAttribute.Book.Author.Id,
                        AuthorName = bookAttribute.Book.Author.Name,
                        AttributeId = bookAttribute.AttributeId,
                        AttributeName = bookAttribute.Attribute.Name,
                        PictureUrl = bookAttribute.Book.Media.FirstOrDefault(x => x.IsMain)?.Url,
                        Quantity = request.ItemParams.Quantity,
                        StockStatus = StockStatus.InStock.ToString(),
                        IsReviewed = false
                    };
                    
                    if (DateTime.Now >= bookAttribute.SalePriceStartDate && DateTime.Now <= bookAttribute.SalePriceEndDate)
                    {
                        newItem.Price = bookAttribute.SalePrice;
                    }
                    else
                    {
                        newItem.Price = bookAttribute.Price;
                    }
                    
                    cart.Items.Add(newItem);
                }
                //Update 
                else
                {
                    var index = cart.Items.IndexOf(item);
                    cart.Items.ElementAt(index).Quantity = request.ItemParams.Quantity;
                    
                    if (DateTime.Now >= bookAttribute.SalePriceStartDate && DateTime.Now <= bookAttribute.SalePriceEndDate)
                    {
                        cart.Items.ElementAt(index).Price = bookAttribute.SalePrice;
                    }
                    else
                    {
                        cart.Items.ElementAt(index).Price = bookAttribute.Price;
                    }
                }
                
                await _context.SaveChangesAsync();

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}