using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<BooksDto>>>
        {
            public BookParams Params { get; set; }
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
                var query = _context.Books
                    .Include(x => x.Categories)
                    .Include(x => x.Author)
                    .Include(x => x.Language)
                    .Include(x => x.Attributes)
                    .Include(x => x.Media)
                    .Where(x => x.IsPublic == true && x.IsDeleted == false && x.StockStatus == StockStatus.InStock)
                    .AsQueryable();

                if (request.Params.CategoryId != null)
                {
                    query = query.Where(
                        x => x.Categories.Any(c => c.CategoryId.ToString() == request.Params.CategoryId));
                }

                if (request.Params.AuthorId != null)
                {
                    query = query.Where(x => x.Author.Id.ToString() == request.Params.AuthorId);
                }

                if (request.Params.LanguageIds != null)
                {
                    var language = request.Params.LanguageIds.Split(",");
                    foreach (var id in language)
                    {
                        query = query.Where(x => x.Language.Id.ToString() == id);
                    }
                }

                if (request.Params.AttributeId != null)
                {
                    query = query.Where(x =>
                        x.Attributes.Any(a => a.AttributeId.ToString() == request.Params.AttributeId));
                }

                if (request.Params.MinPrice >= 0 && request.Params.MaxPrice > 0)
                {
                    query = query.Where(x => x.Price > request.Params.MinPrice && x.Price > request.Params.MaxPrice);
                }
                
                if (request.Params.Rates != null)
                {
                    var rateStrings = request.Params.Rates.Split(",");
                    List<int> rates = new List<int>();
                    foreach (var s in rateStrings)
                    {
                        var rateInt = Int32.Parse(s);
                        if (rateInt > 0 && rateInt <= 5)
                        {
                            rates.Add(rateInt);
                        }
                    }

                    var reviews = _context.Reviews.AsNoTracking().GroupBy(x => x.BookId, r => r.Rate)
                        .Select(g => new
                        {
                            BookId = g.Key,
                            Rating = (int) Math.Round(g.Average())
                        });
                    var listBookId = reviews.Where(x => rates.Any(r => Equals(r, x.Rating))).Select(x => x.BookId);

                    foreach (var bookId in listBookId)
                    {
                        query = query.Where(x => x.Id == bookId);
                    }
                }

                var booksDto = query.Select(x => new BooksDto()
                {
                    Id = x.Id,
                    AttributeId = x.Attributes.FirstOrDefault().AttributeId,
                    AttributeName = x.Attributes.FirstOrDefault().Attribute.Name,
                    AuthorId = x.Author.Id,
                    AuthorName = x.Author.Name,
                    Name = x.Name,
                    LanguageId = x.Language.Id,
                    LanguageName = x.Language.Name,
                    Price = x.Price,
                    SalePrice = x.SalePrice,
                    PictureUrl = x.Media.FirstOrDefault(x => x.IsMain == true).Url
                }).AsQueryable();

                return Result<PagedList<BooksDto>>.Success
                    (await PagedList<BooksDto>.CreatePage(booksDto, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}