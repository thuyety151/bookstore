using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MoreLinq;
using MoreLinq.Extensions;
using Persistence;

namespace Application.Books
{
    public class ListAdmin
    {
        public class Query : IRequest<Result<PagedList<BooksDto>>>
        {
            public PagingParams Params { get; set; }
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
                var booksDto = _context.BookAttributes
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
                    .Where(x => x.Book.IsDeleted == false)
                    .OrderByDescending(x => x.Book.CreateDate)
                    .ProjectTo<BooksDto>(_mapper.ConfigurationProvider);
                

                return Result<PagedList<BooksDto>>.Success
                    (await PagedList<BooksDto>.CreatePage(booksDto, request.Params.PageIndex, request.Params.PageSize));
            }
            
            
        }
        
     
       
    }
}

