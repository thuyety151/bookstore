using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Attributes
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var attriute = _context.Attributes.FirstOrDefault(x => x.Id == request.Id);

                if (attriute == null)
                {
                    return Result<Unit>.Failure("Attribute does not exist");
                }

                attriute.IsDeleted = true;

                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                    return Result<Unit>.Success(Unit.Value);
                
                return Result<Unit>.Failure("Error when delete attribute");
            }
        }
    }
}