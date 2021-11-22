using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Books
{
    public class BestSelling
    {
        public class Query : IRequest<Result<List<BooksDto>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<List<BooksDto>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<BooksDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categoriesConfig = await _context.ConfigHomePages
                    .SingleOrDefaultAsync(x => x.Key == ConfigQuantityName.BestSelling.ToString());

                var items = _context.Orders.Include(x => x.Items)
                    .Where(x => x.IsDeleted == false)
                    .SelectMany(x => x.Items)
                    .GroupBy(x => new { x.ProductId, x.AttributeId })
                    .OrderByDescending(x => x.Count())
                    .Select(x => new
                    {
                        BookId = x.Key.ProductId,
                        x.Key.AttributeId
                    })
                    .Take(categoriesConfig.Quantity)
                    .ToList();

                var results = new List<BooksDto>();
                foreach (var item in items)
                {
                    var books = await _context.BookAttributes
                        .Include(x => x.Book)
                        .ThenInclude(x => x.Author)
                        .Include(x => x.Book)
                        .ThenInclude(x => x.Language)
                        .Where(x => x.Book.IsDeleted == false && x.TotalStock > 0
                                                              && x.AttributeId == item.AttributeId && x.BookId == item.BookId)
                        .Select(x => new BooksDto()
                        {
                            Id = x.BookId,
                            AttributeId = x.AttributeId,
                            AttributeName = x.Attribute.Name,
                            AuthorId = x.Book.Author.Id,
                            AuthorName = x.Book.Author.Name,
                            Name = x.Book.Name,
                            LanguageId = x.Book.Language.Id,
                            LanguageName = x.Book.Language.Name,
                            Price = x.Price,
                            SalePrice = x.SalePrice,
                            PictureUrl = x.Book.Media.FirstOrDefault(m => m.IsMain == true).Url
                        }).SingleOrDefaultAsync();git
                    results.Add((books));
                }

                return Result<List<BooksDto>>.Success(results);
            }
        }
    }
}