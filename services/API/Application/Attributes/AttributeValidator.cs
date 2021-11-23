using FluentValidation;

namespace Application.Attributes
{
    public class AttributeValidator : AbstractValidator<AttributeParams>
    {
        public AttributeValidator()
        {
            RuleFor(x => x.Name).NotNull();
            RuleFor(x => x.Slug).NotNull();
        }
    }
}