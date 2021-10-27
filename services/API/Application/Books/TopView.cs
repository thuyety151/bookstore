using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class TopView : IRequest<Result<List<BookDto>>>
    {
        public class Handler : IRequestHandler<TopView, Result<List<BookDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<BookDto>>> Handle(TopView request, CancellationToken cancellationToken)
            {
                var quantity = await _context.ConfigQuantities
                                .Where(x => x.Key == ConfigQuantityName.MostView.ToString()).Select(x => x.Quantity).SingleOrDefaultAsync();

                var items = await _context.Books.Include(x => x.Media).Include(x => x.Language)
                    .Include(x => x.Attributes)
                    .ThenInclude(x => x.Attribute)
                    .Include(x => x.Author).Where(x => x.IsDeleted == false)
                        .OrderByDescending(x => x.ViewCount).Take(quantity)
                        .Select(x => _mapper.Map<BookDto>(x)).ToListAsync();
                return Result<List<BookDto>>.Success(items);
            }
        }
    }
}