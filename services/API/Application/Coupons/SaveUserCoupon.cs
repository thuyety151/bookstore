using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Coupons
{
    public class SaveUserCoupon
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string CouponId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CouponId).NotNull();
            }
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
                var userId = _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                var coupon = _context.Coupons.FirstOrDefault(x => x.Id.ToString() == request.CouponId);

                if (coupon == null)
                {
                    return Result<Unit>.Failure("Coupon does not exist");
                }

                var userCoupon = _context.UserCoupons.FirstOrDefault(x => x.CouponId.ToString() == request.CouponId);

                if (userCoupon != null)
                {
                    return Result<Unit>.Failure("You already save this coupon");
                }

                _context.UserCoupons.Add(new UserCoupon()
                {
                    CouponId = coupon.Id,
                    Coupon = coupon,
                    UserId = userId,
                    User = _context.Users.FirstOrDefault(x => x.Id == userId)
                });

                await _context.SaveChangesAsync();
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}