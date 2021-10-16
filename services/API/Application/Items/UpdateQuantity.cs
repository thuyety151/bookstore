using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items
{
    public class UpdateQuantity
    {
        public class Query : IRequest<Result<Guid>>
        {
            public Guid Id { get; set; }
            public int Quantity { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Guid>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Guid>> Handle(Query request, CancellationToken cancellationToken)
            {
                if (request.Quantity <= 0)
                {
                    return Result<Guid>.Failure("Quantity is not valid");
                }
                var item = await _context.Items.Where(x => x.Id == request.Id).FirstOrDefaultAsync();
                if (item == null)
                {
                    return Result<Guid>.Failure("Item does not exist");
                }
                item.Quantity = request.Quantity;
                _context.Items.Update(item);
                await _context.SaveChangesAsync();
                return Result<Guid>.Success(request.Id);
            }
        }
    }
}