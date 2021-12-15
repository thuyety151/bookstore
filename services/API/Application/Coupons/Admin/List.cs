using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.Enum;
using MediatR;
using Persistence;

namespace Application.Coupons.Admin
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<CouponDto>>>
        {
            public PagingParams Params { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<PagedList<CouponDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<PagedList<CouponDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var couponDtos = _context.Coupons.Where(x => x.IsDeleted == false)
                    .Select(x => new CouponDto()
                    {
                        Id = x.Id,
                        Description = x.Description,
                        Code = x.Code,
                        CouponAmount = x.CouponAmount,
                        DiscountType = x.DiscountType,
                        ExpireDate = x.ExpireDate
                    });

                return Result<PagedList<CouponDto>>.Success(
                    await PagedList<CouponDto>.CreatePage(couponDtos, request.Params.PageIndex,
                        request.Params.PageSize));
            }
        }
    }
}