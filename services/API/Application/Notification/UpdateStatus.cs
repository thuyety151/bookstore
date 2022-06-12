using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Notification
{
    public class UpdateStatus
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid? Id { get; set; }
            public bool? IsReadAll { get; set; }
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
                var notis = _context.UserNotis.Include(x => x.Notification)
                    .Where(x =>
                        x.UserId == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)
                    );

                if (request.IsReadAll != true && request.Id != null)
                {
                    notis = notis.Where(x => x.NotificationId == request.Id);
                }

                foreach (var item in notis)
                {
                    item.IsRead = true;
                }

                await _context.SaveChangesAsync(cancellationToken);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}