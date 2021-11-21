using System;
using FluentValidation;

namespace Application.Orders.Admin
{
    public class OrderValidator : AbstractValidator<OrderParams>
    {
        public OrderValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.AddressId).NotEmpty();
        }
    }
}