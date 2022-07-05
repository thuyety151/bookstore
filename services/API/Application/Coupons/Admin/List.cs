using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;

namespace Application.Coupons.Admin
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<CouponDto>>>
        {
            public PagingParams Params { get; set; }
            public string Predicate { get; set; }
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
                var coupons = _context.Coupons.Where(x => x.IsDeleted == false);


                var couponsDto =  coupons.OrderByDescending(x => x.CreateDate).Select(x => new CouponDto()
                {
                    Id = x.Id,
                    Description = x.Description,
                    Code = x.Code,
                    CouponAmount = x.CouponAmount,
                    DiscountType = x.DiscountType,
                    ExpireDate = x.ExpireDate,
                    ImageUrl = x.Media.Url,
                    MinSpend = x.MinSpend,
                    IsExpired = x.IsExpired,
                    Media = x.Media
                }).ToList();
                
                if (!string.IsNullOrWhiteSpace(request.Predicate))
                {
                    switch (request.Predicate)
                    {
                        case "expired":
                            couponsDto = couponsDto.Where(x => x.IsExpired).ToList();
                            break;
                        case "unExpired":
                            couponsDto = couponsDto.Where(x => x.IsExpired == false).ToList();
                            break;
                    }
                }

                return Result<PagedList<CouponDto>>.Success(
                    await PagedList<CouponDto>.CreatePageEnumerable(couponsDto, request.Params.PageIndex,
                        request.Params.PageSize));
            }
        }
    }
}