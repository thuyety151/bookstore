using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Orders
{
    public class UpdateOrderCode
    {
        public class Command : IRequest<Result<Guid>>
        {
            public Guid Id { get; set; }
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
                var order = _context.Orders.FirstOrDefault(x => x.Id == request.Id);

                if (order == null)
                {
                    return Result<Guid>.Failure("Order does not exist");
                }

                if (!string.IsNullOrWhiteSpace(request.OrderCode))
                {
                    
                }
                
                return Result<Guid>.Failure("Order does not exist");
            }
        }
    }
}