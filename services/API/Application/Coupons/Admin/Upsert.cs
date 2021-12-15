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
                var isNameExist = _context.Coupons.Any(x => x.Code == request.CouponParams.Code && x.IsDeleted == false && x.Id != request.CouponParams.Id);
                if (isNameExist)
                {
                    return Result<Guid>.Failure("Code is already exist");
                }
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
                        MinSpend = request.CouponParams.MinSpend,
                        CreateDate = DateTime.Now
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
                    var coupon =
                        _context.Coupons.FirstOrDefault(x => x.Id == request.CouponParams.Id && x.IsDeleted == false);
                    if (coupon == null)
                    {
                        return Result<Guid>.Failure("Coupon does not exist");
                    }

                    coupon.Code = request.CouponParams.Code;
                    coupon.Description = request.CouponParams.Description;
                    coupon.CouponAmount = request.CouponParams.CouponAmount;
                    coupon.DiscountType = request.CouponParams.DiscountType;
                    coupon.ExpireDate = request.CouponParams.ExpireDate;
                    coupon.MinSpend = request.CouponParams.MinSpend;

                    await _context.SaveChangesAsync();
                    return Result<Guid>.Success(coupon.Id);
                }
            }
        }
    }
}