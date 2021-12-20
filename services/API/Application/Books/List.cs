using System;
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
    public class List
    {
        public class Query : IRequest<Result<PagedList<BooksDto>>>
        {
            public BookParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<BooksDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<PagedList<BooksDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.BookAttributes
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
                    .Where(x => x.Book.IsPublic && x.Book.IsDeleted == false && x.StockStatus == StockStatus.InStock)
                    .AsQueryable();
                if (!string.IsNullOrWhiteSpace(request.Params.CategoryId))
                {
                    query = query.Where(
                        x => x.Book.Categories.Any(c => c.CategoryId.ToString() == request.Params.CategoryId
                        || c.Category.ParentId.ToString() == request.Params.CategoryId));
                }

                if (!string.IsNullOrWhiteSpace(request.Params.AuthorId))
                {
                    query = query.Where(x => x.Book.Author.Id.ToString() == request.Params.AuthorId);
                }

                if (!string.IsNullOrWhiteSpace(request.Params.LanguageIds))
                {
                    query = query.Where(x => x.Book.Language.Id.ToString() == request.Params.LanguageIds);
                }

                if (!string.IsNullOrWhiteSpace(request.Params.AttributeId))
                {
                    query = query.Where(x =>
                        x.Book.Attributes.Any(a => a.AttributeId.ToString() == request.Params.AttributeId && a.StockStatus == StockStatus.InStock));

                }
                else
                {
                    var defaultAttributeId = _context.ConfigHomePages.FirstOrDefault()?.DefaultAttributeId;
                    query = query.Where(x => x.AttributeId == defaultAttributeId);
                }
               
                if (request.Params.MinPrice >= 0 && request.Params.MaxPrice > 0)
                {
                    query = query.Where(x =>
                        x.Price >
                        request.Params.MinPrice &&
                        x.Price <
                        request.Params.MaxPrice);
                }

                if (request.Params.Rates > 0)
                {
                    // var rateStrings = request.Params.Rates.Split(",");
                    // List<int> rates = new List<int>();
                    // foreach (var s in rateStrings)
                    // {
                    //     var rateInt = Int32.Parse(s);
                    //     if (rateInt > 0 && rateInt <= 5)
                    //     {
                    //         rates.Add(rateInt);
                    //     }
                    // }

                    var reviews = _context.Reviews.AsNoTracking().GroupBy(x => x.BookId, r => r.Rate)
                        .Select(g => new
                        {
                            BookId = g.Key,
                            Rating = (int) Math.Round(g.Average())
                        });
                    var listBookId = reviews.Where(x => x.Rating == request.Params.Rates).Select(x => x.BookId);

                    foreach (var bookId in listBookId)
                    {
                        query = query.Where(x => x.BookId == bookId);
                    }
                }

                if (!string.IsNullOrWhiteSpace(request.Params.Predicate))
                {
                    var configQuantity = _context.ConfigHomePages;

                    switch (request.Params.Predicate)
                    {
                        case "home-most-view":
                            var configQuantityHome =
                                configQuantity.FirstOrDefault(x => x.Key == ConfigQuantityName.MostView.ToString());
                            request.Params.PageSize =  configQuantityHome?.Quantity ??
                                                      request.Params.PageSize;

                            query = query.OrderByDescending(x => x.Book.ViewCount).Where(x => x.AttributeId == configQuantityHome.DefaultAttributeId);
                            break;
                  
                        case "popular":
                            query = query.OrderByDescending(x => x.Book.ViewCount);
                            break;
                        case "newest":
                            query = query.OrderByDescending(x => x.Book.CreateDate);
                            break;
                        case "low-price":
                            query = query.OrderBy(x => x.Price);
                            break;
                        case "high-price":
                            query = query.OrderByDescending(x => x.Price);
                            break;
                        case "on-sale":
                            var configQuantityOnSale =
                                configQuantity.FirstOrDefault(x => x.Key == ConfigQuantityName.OnSale.ToString());
                            request.Params.PageSize =  configQuantityOnSale?.Quantity ??
                                                       request.Params.PageSize;

                            query = query.Where(x => x.SalePriceEndDate >= DateTime.Now)
                                .OrderByDescending(x => x.SalePriceEndDate);
                            break;
                        case "deal-of-week":
                            var configQuantityDealOfWeek =
                                configQuantity.FirstOrDefault(x => x.Key == ConfigQuantityName.DealsOfWeek.ToString());
                            request.Params.PageSize =  configQuantityDealOfWeek?.Quantity ??
                                                       request.Params.PageSize;

                            query = query.Where(x => x.SalePriceEndDate >= DateTime.Now)
                                .OrderByDescending(x => x.TotalStock);
                            break;
                        default:
                            break;
                    }
                }
                

                var booksDto = query.Select(x => new BooksDto()
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
                    PictureUrl = x.Book.Media.FirstOrDefault(m => m.IsMain).Url,
                    StockStatus = x.StockStatus.ToString(),
                    Categories = String.Join(",", x.Book.Categories.Select(c => c.Category.Name)),
                    PublishDate = x.Book.PublicationDate

                }).AsQueryable();

                return Result<PagedList<BooksDto>>.Success
                    (await PagedList<BooksDto>.CreatePage(booksDto, request.Params.PageIndex, request.Params.PageSize));
            }
            
            
        }
        
     
       
    }
}

