using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper.QueryableExtensions;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Persistence;

namespace Application.Addresses
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Address>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<Address>>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }
            public async Task<Result<PagedList<Address>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var addresses = _context.Users.Include(x => x.Address).Where(x => x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier))
                    .SelectMany(x => x.Address).AsQueryable();
                return Result<PagedList<Address>>.Success(await PagedList<Address>.CreatePage(addresses, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}