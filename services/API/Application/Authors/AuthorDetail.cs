using System;
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
                var author = _context.Authors.Include((x) => x.Books).ThenInclude(x => x.Media).Where(x => x.Id == request.Id)
                    .Select(x => new AuthorDetailDto()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        ImageUrl = x.Media.Url,
                        Count = x.Books.Count,
                        Description = x.Description,
                        Books = x.Books
                            .Join(_context.BookAttributes.Include(x => x.Book)
                                    .ThenInclude(x => x.Media), (dto) => dto.Id, (b) => b.BookId,
                                (a, b) =>
                                    new BooksDto()
                                    {
                                        Id = b.BookId,
                                        Name = b.Book.Name,
                                        Price = b.Price,
                                        TotalStock = b.TotalStock,
                                        SalePrice = b.SalePrice,
                                        PictureUrl = b.Book.Media.FirstOrDefault(x => x.IsMain).Url,
                                        AuthorId = x.Id,
                                        AuthorName = x.Name,
                                        LanguageId = b.Book.Language.Id,
                                        LanguageName = b.Book.Language.Name,
                                        AttributeId = b.AttributeId,
                                        AttributeName = b.Attribute.Name,
                                        StockStatus = b.StockStatus.ToString(),
                                    })
                            .Take(5).ToList()
                    }).SingleOrDefault();
                return Result<AuthorDetailDto>.Success(author);
            }
        }
    }
}