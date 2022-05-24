using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class ListAdmin
    {
        public class Query : IRequest<Result<PagedList<BooksDto>>>
        {
            public PagingParams Params { get; set; }
            public string Status { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<BooksDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<BooksDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var defaultAttributeId = _context.ConfigHomePages.FirstOrDefault()?.DefaultAttributeId;
                var hi = StockStatus.InStock.ToString() == request.Status;
                var books = _context.BookAttributes
                    .Include(x => x.Book)
                    .ThenInclude(x => x.Categories)
                    .ThenInclude(x => x.Category)
                    .Include(x => x.Book)
                    .ThenInclude(x => x.Author)
                    .Include(x => x.Book)
                    .ThenInclude(x => x.Language)
                    .Include(x => x.Book)
                    .ThenInclude(x => x.Media)
                    .Include(x => x.Attribute)
                    .Where(x => x.Book.IsDeleted == false && x.AttributeId == defaultAttributeId)
                    .OrderByDescending(x => x.Book.CreateDate);
                if (request.Status != null)
                {
                    books = (IOrderedQueryable<BookAttribute>) books.Where(x => x.StockStatus.Equals((StockStatus) Enum.Parse(typeof(StockStatus), request.Status)));
                }
                var booksDto = books.ProjectTo<BooksDto>(_mapper.ConfigurationProvider);
                return Result<PagedList<BooksDto>>.Success
                    (await PagedList<BooksDto>.CreatePage(booksDto, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}