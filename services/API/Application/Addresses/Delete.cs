using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Addresses
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
                var user = await _context.Users.Include(x => x.Address)
                    .FirstOrDefaultAsync(
                        x => x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier), cancellationToken: cancellationToken);
                var address = user.Address.FirstOrDefault(x => x.Id == request.Id);
                if (address == null)
                {
                    return Result<Guid>.Failure("Address does not exist");
                }
                if (address.IsMain && user.Address.Count >0)
                {
                    user.Address.FirstOrDefault().IsMain = true;
                }
                user.Address.Remove(address);
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Guid>.Success(request.Id);
            }
        }
    }
}