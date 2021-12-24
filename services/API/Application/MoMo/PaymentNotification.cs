using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MoMo
{
    public class PaymentNotification
    {
        public class Command : IRequest<Result<Unit>>
        {
            public PaymentNotificationParams PaymentNotificationParams { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var order =  _context.Orders.FirstOrDefault(x =>
                    x.Id.ToString().ToLower() == request.PaymentNotificationParams.OrderId);

                if (order == null)
                {
                    return Result<Unit>.Failure("Payment error. Order does not existed");
                }

                order.TransId = request.PaymentNotificationParams.TransId;
                order.ResultCode = request.PaymentNotificationParams.ResultCode;
                order.PaymentStatus = PaymentStatus.Completed;
                await _context.SaveChangesAsync();
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}