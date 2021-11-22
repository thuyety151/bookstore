using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Coupons
{
    public class VerifyCoupon
    {
        public class Query : IRequest<Result<CouponDto>>
        {
            public VerifyCouponParams VerifyCouponParams { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CouponDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<CouponDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var coupon = await _context.Coupons.Include(x => x.Books).SingleOrDefaultAsync((x) =>
                    x.Code == request.VerifyCouponParams.Code.Trim() && x.IsDeleted == false);
                if (coupon == null)
                {
                    return Result<CouponDto>.Failure("Coupon is not exist");
                }

                if (DateTime.Now > coupon.ExpireDate)
                {
                    return Result<CouponDto>.Failure("Coupon is expired");
                }

                foreach (var item in request.VerifyCouponParams.Items)
                {
                    var checkProductId = coupon.Books.SingleOrDefault((x) => x.BookId == item.ProductId);
                    if (checkProductId != null && item.Price * item.Quantity >= coupon.MinSpend)
                    {
                        return Result<CouponDto>.Success(_mapper.Map<CouponDto>(coupon));
                    }
                }

                return Result<CouponDto>.Failure("Coupon is invalid");
            }
        }
    }
}