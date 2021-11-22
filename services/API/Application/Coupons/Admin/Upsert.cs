using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Coupons.Admin
{
    public class Upsert
    {
        public class Command : IRequest<Result<Guid>>
        {
            public CouponParams CouponParams { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CouponParams).SetValidator(new CouponValidator());
            }
        }
        
        public class Handler : IRequestHandler<Command, Result<Guid>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Add
                if (request.CouponParams.Id == Guid.Empty)
                {
                    var coupon = new Coupon()
                    {
                        Id = new Guid(),
                        Code = request.CouponParams.Code,
                        Description = request.CouponParams.Description,
                        ExpireDate = request.CouponParams.ExpireDate,
                        CouponAmount = request.CouponParams.CouponAmount,
                        DiscountType = request.CouponParams.DiscountType,
                        IsDeleted = false,
                        MinSpend = request.CouponParams.MinSpend
                    };

                    _context.Coupons.Add(coupon);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (result)
                    {
                        return Result<Guid>.Success(coupon.Id);
                    }
                    
                    return Result<Guid>.Failure("Error when add coupon");
                }
                //Update
                else
                {
                   
                }
                return Result<Guid>.Failure("Error when add coupon");
            }
        }
    }
}