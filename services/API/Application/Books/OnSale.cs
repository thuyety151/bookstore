using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class OnSale
    {
        public class Query : IRequest<Result<PagedList<BookDto>>>
        {
            public PagingParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<BookDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<PagedList<BookDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var books = _context.Coupons
                            .Where(x => ((DateTime?)x.ExpireDate >= DateTime.Now) == true)
                            .OrderByDescending(x => x.ExpireDate)
                            .SelectMany(x => x.Books)
                            .Where(x => x.Book.IsDeleted == false)
                            .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
                            .AsQueryable();
                return Result<PagedList<BookDto>>.Success(await PagedList<BookDto>.CreatePage(books, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}