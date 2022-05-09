using Domain;
using FluentValidation;
namespace Application.Authors
{
    public class AuthorValidator: AbstractValidator<Author>
    {
        public AuthorValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Media).NotEmpty();

        }
    }
}