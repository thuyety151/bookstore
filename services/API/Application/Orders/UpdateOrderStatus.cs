using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Orders
{
    public class UpdateOrderStatus
    {
        public class Command : IRequest<Result<Guid>>
        {
            public string OrderCode { get; set; }
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
                var order = _context.Orders.FirstOrDefault(x => x.OrderCode == request.OrderCode);

                if (order == null)
                {
                    return Result<Guid>.Failure("Order does not exist");
                }

                order.Status = "Cancel";
                var result = await _context.SaveChangesAsync() > 0;
                
                if (result) return Result<Guid>.Success(order.Id);
                
                return Result<Guid>.Failure("Order does not exist");
            }
        }
    }
}