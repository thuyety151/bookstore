using FluentValidation;

namespace Application.Carts.Items
{
    public class ItemValidator: AbstractValidator<ItemParams>
    {
        public ItemValidator()
        {
            RuleFor(x => x.ProductId).NotEmpty();
            RuleFor(x => x.ProductName).NotNull();
            RuleFor(x => x.AuthorId).NotEmpty();
            RuleFor(x => x.AuthorName).NotEmpty();
            RuleFor(x => x.Quantity).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
            RuleFor(x => x.Quantity).GreaterThan(0);
            RuleFor(x => x.Price).GreaterThan(0);

        }
    }

}