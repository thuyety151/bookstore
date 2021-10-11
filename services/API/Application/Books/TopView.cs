using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class TopView
    {
        public class Query : IRequest<Result<List<BookDto>>>
        {
            public int Quantity { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<BookDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<BookDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                if (request.Quantity <= 0)
                {
                    return Result<List<BookDto>>.Failure("Quantity is not valid");
                }
                var items = await _context.Books.Include(x => x.Media).Include(x => x.Language).Include(x => x.Attribute)
                .Include(x => x.Author).Where(x => x.IsDeleted == false)
                        .OrderByDescending(x => x.ViewCount).Take(request.Quantity)
                        .Select(x => _mapper.Map<BookDto>(x)).ToListAsync();
                return Result<List<BookDto>>.Success(items);
            }
        }
    }
}