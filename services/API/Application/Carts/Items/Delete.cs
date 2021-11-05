using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.Enum;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Carts.Items
{
    public class Delete
    {
        public class Command : IRequest<Result<Guid>>
        {
            public Guid Id { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
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
                var cart = _context.Carts.Include(x => x.Items).FirstOrDefault(x =>
                    x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

                if (cart != null)
                {
                    var item = cart.Items.FirstOrDefault(x => x.Id == request.Id);
                    if (item == null)
                    {
                        return Result<Guid>.Failure("Item does not exist");
                    }

                    cart.Items.Remove(item);

                    var bookAttribute = _context.BookAttributes.Include(x => x.Book)
                        .Include(x => x.Attribute)
                        .FirstOrDefault(x => x.BookId == item.ProductId && x.AttributeId == item.AttributeId);

                    if (bookAttribute != null)
                    {
                        bookAttribute.TotalStock += item.Quantity;

                        if (bookAttribute.TotalStock > 0)
                        {
                            bookAttribute.StockStatus = StockStatus.InStock;
                        }

                        _context.BookAttributes.Update(bookAttribute);
                    }

                    _context.Items.Remove(item);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Guid>.Failure("Failed to delete item");

                return Result<Guid>.Success(request.Id);
            }
        }
    }
}