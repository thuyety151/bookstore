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

namespace Application.WishList.Items
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
                var wishList = _context.WishLists.Include(x => x.Items).FirstOrDefault(x =>
                    x.Id == Guid.Parse((ReadOnlySpan<char>) _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));

                if (wishList != null)
                {
                    var item = wishList.Items.FirstOrDefault(x => x.Id == request.Id);
                    if (item == null)
                    {
                        return Result<Guid>.Failure("Item does not exist");
                    }
                    // wishList.Items.Remove(item);
                    _context.Items.Remove(item);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Guid>.Failure("Failed to delete item");

                return Result<Guid>.Success(request.Id);
            }
        }
    }
}