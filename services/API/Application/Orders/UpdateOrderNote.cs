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
    public class UpdateOrderNote
    {
        public class Command : IRequest<Result<Guid>>
        {
            public Guid OrderId { get; set; }
            public string OrderNote{ get; set; }
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
                var order = _context.Orders.FirstOrDefault(x => x.Id == request.OrderId);

                if (order == null)
                {
                    return Result<Guid>.Failure("Order does not exist");
                }

                order.OrderNote = request.OrderNote;
                 await _context.SaveChangesAsync();
                
                return Result<Guid>.Success(order.Id);
            }
        }
    }
}