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

                if (string.IsNullOrEmpty(userId))
                {
                    return Result<Unit>.Failure("Unauthorized");
                }

                var user = _context.Users.FirstOrDefault(x => x.Id == userId);
                
                if (user == null)
                {
                    return Result<Unit>.Failure("Unauthorized");
                }
                

                var coupon = _context.Coupons.FirstOrDefault(x => x.Id.ToString() == request.CouponId);

                if (coupon == null)
                {
                    return Result<Unit>.Failure("Coupon does not exist");
                }

                if (coupon.IsExpired)
                {
                    return Result<Unit>.Failure("Coupon is expired");
                }

                var userCoupon = _context.UserCoupons.FirstOrDefault(x => x.CouponId.ToString() == request.CouponId);

                if (userCoupon != null)
                {
                    return Result<Unit>.Failure(userCoupon.IsUsed ? "You already used this coupon" : "You already saved this coupon");
                }

                _context.UserCoupons.Add(new UserCoupon()
                {
                    CouponId = coupon.Id,
                    Coupon = coupon,
                    UserId = userId,
                    User = user
                });

                var result = await _context.SaveChangesAsync();

                if (result == 0)
                {
                    Result<Unit>.Failure("Something wrong when save coupon!");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}