using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Books;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Coupons
{
    public class ListUserCoupon
    {
        public class Query : IRequest<Result<List<Admin.CouponDto>>>
        {
            
        }
        
        public class Handler : IRequestHandler<Query, Result<List<Admin.CouponDto>>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IHttpContextAccessor httpContext, IMapper mapper)
            {
                _context = context;
                _httpContext = httpContext;
                _mapper = mapper;
            }
            public async Task<Result<List<Admin.CouponDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                var couponDtos = await _context.UserCoupons.Include(x => x.Coupon).ThenInclude(x => x.Media)
                    .Where(x => x.UserId == userId)
                    .ProjectTo<Admin.CouponDto>(_mapper.ConfigurationProvider).ToListAsync();

                return Result<List<Admin.CouponDto>>.Success(couponDtos);
            }
        }
    }
}