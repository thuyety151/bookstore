using FluentValidation;

namespace Application.Categories.Admin
{
    public class CategoryValidator : AbstractValidator<CategoryParams>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.Name).NotNull();
            RuleFor(x => x.Slug).NotNull();
        }
    }
}