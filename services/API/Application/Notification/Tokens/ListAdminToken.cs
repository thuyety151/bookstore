using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.Constant;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Notification.Tokens
{
    public class ListAdminToken
    {
        public class Query : IRequest<Result<List<string>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<string>>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }

            public async Task<Result<List<string>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tokens =await  _context.FcmTokens
                    .Where(x =>
                        x.User.Role==Role.Admin)
                    .Select(x => x.Token).ToListAsync();

                return Result<List<string>>.Success(tokens);
            }
        }
    }
}