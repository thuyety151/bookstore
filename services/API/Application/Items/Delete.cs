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
    public class Delete
    {
        public class Query : IRequest<Result<Guid>>
        {
            public Guid Id { get; set; }
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
                var item = await _context.Items.Where(x => x.Id == request.Id).FirstOrDefaultAsync();
                if (item == null)
                {
                    return Result<Guid>.Failure("Item does not exist");
                }
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
                return Result<Guid>.Success(request.Id);
            }
        }
    }
}