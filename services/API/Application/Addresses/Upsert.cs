using System.Security.Cryptography.X509Certificates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using Domain.Enum;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
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


                if (request.AddressParams.IsMain)
                {
                    var defaultAddress = user.Address.FirstOrDefault(x => x.IsMain == true);
                    if (defaultAddress != null)
                    {
                        return Result<Unit>.Failure("IsMain is not valid");
                    }
                }
                var address = await _context.Users.Where(x => x.Id == _httpContext.HttpContext.User
                            .FindFirstValue(ClaimTypes.NameIdentifier))
                            .SelectMany(x => x.Address).Where(x => x.Id == request.AddressParams.Id)
                            .SingleOrDefaultAsync();
                //Add
                if (address == null)
                {
                    var newAddress = new Address()
                    {
                        Id = new Guid(),
                        FirstName = request.AddressParams.FirstName,
                        LastName = request.AddressParams.LastName,
                        Phone = request.AddressParams.Phone,
                        ApartmentNumber = request.AddressParams.ApartmentNumber,
                        StreetAddress = request.AddressParams.StreetAddress,
                        DistrictID = request.AddressParams.DistrictID,
                        ProvinceID = request.AddressParams.ProvinceID,
                        WardName = request.AddressParams.WardName,
                        DistrictName = request.AddressParams.DistrictName,
                        ProvinceName = request.AddressParams.ProvinceName,
                        IsMain = request.AddressParams.IsMain
                    };
                    user.Address.Add(newAddress);
                }
                //Update ...

                await _context.SaveChangesAsync();
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}