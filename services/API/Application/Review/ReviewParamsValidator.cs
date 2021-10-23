using FluentValidation;

namespace Application.Review
{
    public class ReviewParamsValidator : AbstractValidator<ReviewParams>
    {
        public ReviewParamsValidator()
        {
            RuleFor(x => x.BookId).NotEmpty();
        }
    }
}