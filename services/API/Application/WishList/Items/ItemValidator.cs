using FluentValidation;

namespace Application.WishList.Items
{
    public class ItemValidator: AbstractValidator<ItemParams>
    {
        public ItemValidator()
        {
            RuleFor(x => x.ProductId).NotEmpty();
            RuleFor(x => x.AttributeId).NotEmpty();
            RuleFor(x => x.Quantity).NotEmpty();
            RuleFor(x => x.Quantity).GreaterThan(0);

        }
    }

}