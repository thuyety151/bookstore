using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Books;
using Application.Books.Detail;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;
namespace Application.Authors
{
    public class AuthorDetail
    {
        public class Query : IRequest<Result<AuthorDetailDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<AuthorDetail.Query, Result<AuthorDetailDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<AuthorDetailDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var author = _context.Authors.Include(x => x.Media).Include((x) => x.Books).ThenInclude(x => x.Media).Where(x => x.Id == request.Id).SingleOrDefault();
                if (author == null)
                {
                    return Result<AuthorDetailDto>.Failure("Author does not exist");
                }
                var bookIds = author.Books.Select(x => x.Id).ToList();


                var authorDetailDto = new AuthorDetailDto()
                {
                    Id = author.Id,
                    Name = author.Name,
                    ImageUrl = author.Media.Url,
                    Count = author.Books.Count,
                    Description = author.Description,
                    Books = new List<BooksDto>()
                };

                var booksAttributeOfAuthor = _context.BookAttributes.Include(a => a.Book)
                    .ThenInclude(a => a.Media)
                    .Where(a => bookIds.Contains(a.BookId))
                    .ProjectTo<BooksDto>(_mapper.ConfigurationProvider)
                    .ToList();
                
                authorDetailDto.Books = booksAttributeOfAuthor.GroupBy(x => x.Id).Select(x => x.First()).Take(5).ToList();
                
                return Result<AuthorDetailDto>.Success(authorDetailDto);
            }
        }
    }
}