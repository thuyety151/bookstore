using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Books;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enum;
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
            public string Status { get; set; }
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

                var coupons = await  _context.UserCoupons.Include(x => x.Coupon).ThenInclude(x => x.Media)
                    .Where(x => x.UserId == userId && x.Coupon.IsDeleted == false).ProjectTo<Admin.CouponDto>(_mapper.ConfigurationProvider).ToListAsync();

                if (!string.IsNullOrEmpty(request.Status))
                {
                    if (request.Status == CouponStatus.Used.ToString())
                    {
                        coupons = coupons.Where(x => x.IsUsed).ToList();
                    }
                    else if (request.Status == CouponStatus.Expired.ToString())
                    {
                        coupons = coupons.Where(x => x.IsExpired).ToList();
                    }
                }
                else
                {
                    coupons = coupons.Where(x => !x.IsExpired && !x.IsUsed).ToList();
                }
                
               return Result<List<Admin.CouponDto>>.Success(coupons);
            }
        }
    }
}