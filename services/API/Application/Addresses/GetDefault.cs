using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Addresses
{
    public class GetDefault
    {
        public class Query : IRequest<Result<Address>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<Address>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }
            public async Task<Result<Address>> Handle(Query request, CancellationToken cancellationToken)
            {
                var address =await _context.Users.Include(x => x.Address)
                    .Where(x => x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier))
                    .SelectMany(x => x.Address).Where(x => x.IsMain == true).SingleOrDefaultAsync();
                return Result<Address>.Success(address);
            }
        }
    }
}