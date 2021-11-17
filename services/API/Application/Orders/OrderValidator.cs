using FluentValidation;

namespace Application.Orders
{
    public class OrderValidator : AbstractValidator<OrderParams>
    {
        public OrderValidator()
        {
            RuleFor(x => x.ItemIds).NotEmpty();
            RuleFor(x => x.AddressId).NotEmpty();
        }
    }
}