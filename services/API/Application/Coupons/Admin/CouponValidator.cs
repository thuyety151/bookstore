using FluentValidation;

namespace Application.Coupons.Admin
{
    public class CouponValidator : AbstractValidator<CouponParams>
    {
        public CouponValidator()
        {
            RuleFor(x => x.Code).NotEmpty();
            RuleFor(x => x.CouponAmount).NotNull();
        }
    }
}