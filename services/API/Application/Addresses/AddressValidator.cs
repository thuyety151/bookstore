using FluentValidation;

namespace Application.Addresses
{
    public class AddressValidator : AbstractValidator<AddressParams>
    {
        public AddressValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Phone).NotEmpty();
            RuleFor(x => x.ApartmentNumber).NotEmpty();
            RuleFor(x => x.StreetAddress).NotEmpty();
            RuleFor(x => x.DistrictId).NotEmpty();
            RuleFor(x => x.DistrictName).NotEmpty();
            RuleFor(x => x.ProvinceId).NotEmpty();
            RuleFor(x => x.ProvinceName).NotEmpty();
            RuleFor(x => x.WardName).NotEmpty();
        }
    }
}