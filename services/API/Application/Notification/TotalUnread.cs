using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Books;
using Application.Core;
using Domain;
using Domain.Enum;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Notification
{
    public class TotalUnread
    {
        public class Query : IRequest<Result<int>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }

            public async Task<Result<int>> Handle(Query request, CancellationToken cancellationToken)
            {
                var notis = _context.UserNotis.Include(x => x.Notification)
                    .Where(x =>
                        x.UserId == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier) && x.IsRead==false).AsQueryable();
                return Result<int>.Success(notis.Count());
            }
        }
    }
}