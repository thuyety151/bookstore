using FluentValidation;

namespace Application.Review
{
    public class ReviewValidator : AbstractValidator<Domain.Review>
    {
        public ReviewValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.Rate).GreaterThan(0).LessThanOrEqualTo(5);
            RuleFor(x => x.BookId).NotEmpty();
        }
    }
}