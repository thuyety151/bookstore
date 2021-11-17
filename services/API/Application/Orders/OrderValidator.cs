using FluentValidation;

namespace Application.Orders
{
    public class OrderValidator : AbstractValidator<OrderParams>
    {
        public OrderValidator()
        {
            RuleFor(x => x.Items).NotEmpty();
            RuleFor(x => x.AddressId).NotEmpty();
        }
    }
}