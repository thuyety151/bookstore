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
            private readonly IMediaAccessor _mediaAccessor;

            public Handler(DataContext context, IMediaAccessor mediaAccessor)
            {
                _context = context;
                _mediaAccessor = mediaAccessor;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var book = _context.Books
                    .Include(x => x.Attributes)
                    .Include(x => x.Author)
                    .Include(x => x.Coupons)
                    .Include(x => x.Categories)
                    .Include(x => x.Media)
                    .FirstOrDefault(x => x.Id.ToString() == request.Id && x.IsDeleted == false);
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