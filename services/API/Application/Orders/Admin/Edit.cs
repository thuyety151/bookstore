using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Orders.Admin
{
    public class Edit
    {
        public class Command : IRequest<Result<Guid>>
        {
            public OrderParams OrderParams { get; set; }
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
                var order = _context.Orders.FirstOrDefault(x => x.Id == request.OrderParams.Id);
                
                if (order == null)
                {
                    return Result<Guid>.Failure("Order does not exist");
                }

                if (!string.IsNullOrWhiteSpace(request.OrderParams.CustomerId))
                {
                    order.UserId = _context.Users.FirstOrDefault(x => x.Id == request.OrderParams.CustomerId)?.Id;
                }

                if (request.OrderParams.AddressId != Guid.Empty)
                {
                    order.AddressToShip = _context.Addresses.FirstOrDefault(x => x.Id == request.OrderParams.AddressId);
                }

                if (!string.IsNullOrWhiteSpace(request.OrderParams.OrderNote))
                {
                    order.OrderNote = request.OrderParams.OrderNote;
                }

                var result = await _context.SaveChangesAsync() > 0;
                
                if(result) return Result<Guid>.Success(order.Id);
                
                return Result<Guid>.Failure("Error when edit order");
                
            }
        }
    }
}