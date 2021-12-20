using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Addresses
{
    public class Upsert
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AddressParams AddressParams { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.AddressParams).SetValidator(new AddressValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _context.Users.Include(x => x.Address)
                    .FirstOrDefault(
                        x => x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

                var address = user.Address.SingleOrDefault(x => x.Id == request.AddressParams.Id) ;
                //Add

                if (address == null)
                {
                    var newAddress = new Domain.Address()
                    {
                        Id = new Guid(),
                        FirstName = request.AddressParams.FirstName,
                        LastName = request.AddressParams.LastName,
                        Phone = request.AddressParams.Phone,
                        ApartmentNumber = request.AddressParams.ApartmentNumber,
                        StreetAddress = request.AddressParams.StreetAddress,
                        DistrictId = request.AddressParams.DistrictId,
                        ProvinceId = request.AddressParams.ProvinceId,
                        WardName = request.AddressParams.WardName,
                        WardCode = request.AddressParams.WardCode,
                        DistrictName = request.AddressParams.DistrictName,
                        ProvinceName = request.AddressParams.ProvinceName,
                        IsMain = !(user.Address.Count > 0)
                    };
                    if (request.AddressParams.IsMain)
                    {
                        foreach (var ad in user.Address)
                        {
                            ad.IsMain = false;
                        }
                        newAddress.IsMain = true;
                    }
                    user.Address.Add(newAddress);
                }
                else
                {
                    //Update ...
                    address.FirstName = request.AddressParams.FirstName;
                    address.LastName = request.AddressParams.LastName;
                    address.Phone = request.AddressParams.Phone;
                    address.ApartmentNumber = request.AddressParams.ApartmentNumber;
                    address.StreetAddress = request.AddressParams.StreetAddress;
                    address.DistrictId = request.AddressParams.DistrictId;
                    address.ProvinceId = request.AddressParams.ProvinceId;
                    address.WardName = request.AddressParams.WardName;
                    address.WardCode = request.AddressParams.WardCode;
                    address.DistrictName = request.AddressParams.DistrictName;
                    address.ProvinceName = request.AddressParams.ProvinceName;
                    if (request.AddressParams.IsMain)
                    {
                        foreach (var ad in user.Address)
                        {
                            ad.IsMain = false;
                        }
                        address.IsMain = true;
                    }
                }
                await _context.SaveChangesAsync(cancellationToken);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}