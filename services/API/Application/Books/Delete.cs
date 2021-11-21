using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
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
                var book = _context.Books.FirstOrDefault(x => x.Id.ToString() == request.Id && x.IsDeleted == false);
                if (book == null)
                {
                    return Result<Unit>.Failure("Book does not exist");
                }

                //turn flag isDeleted
                book.IsDeleted = true;
                
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);
                
                return Result<Unit>.Failure("Error when delete book");
            }
        }
    }
}