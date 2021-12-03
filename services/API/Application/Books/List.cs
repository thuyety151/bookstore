using System;
using System.Collections;
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
    public class List : IEnumerable
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
                    .ThenInclude(x => x.Category)
                    .Include(x => x.Author)
                    .Include(x => x.Language)
                    .Include(x => x.Attributes)
                    .ThenInclude(x => x.Attribute)
                    .Include(x => x.Media)
                    .Where(x => x.IsPublic == true && x.IsDeleted == false)
                    .AsQueryable();
                var test = query.ToList();
                if (!string.IsNullOrWhiteSpace(request.Params.CategoryId))
                {
                    query = query.Where(
                        x => x.Categories.Any(c => c.CategoryId.ToString() == request.Params.CategoryId
                        || c.Category.ParentId.ToString() == request.Params.CategoryId));
                }

                if (!string.IsNullOrWhiteSpace(request.Params.AuthorId))
                {
                    query = query.Where(x => x.Author.Id.ToString() == request.Params.AuthorId);
                }

                if (!string.IsNullOrWhiteSpace(request.Params.LanguageIds))
                {
                    query = query.Where(x => x.Language.Id.ToString() == request.Params.LanguageIds);
                }

                string attributeId = request.Params.AttributeId;
                if (string.IsNullOrWhiteSpace(attributeId))
                {
                    attributeId =
                        _context.Attributes.FirstOrDefault(x => x.Name == "Paperback")?.Id.ToString();
                }
                query = query.Where(x =>
                    x.Attributes.Any(a => a.AttributeId.ToString() == attributeId && a.StockStatus == StockStatus.InStock));

                if (request.Params.MinPrice >= 0 && request.Params.MaxPrice > 0)
                {
                    query = query.Where(x =>
                        x.Attributes.FirstOrDefault(a => a.AttributeId.ToString() == attributeId).Price >
                        request.Params.MinPrice &&
                        x.Attributes.FirstOrDefault(a => a.AttributeId.ToString() == attributeId).Price <
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
                        query = query.Where(x => x.Id == bookId);
                    }
                }

                if (!string.IsNullOrWhiteSpace(request.Params.Predicate))
                {
                    var configQuantity = _context.ConfigHomePages;

                    switch (request.Params.Predicate)
                    {
                        case "home-most-view":
                            request.Params.PageSize = configQuantity
                                                          .FirstOrDefault(x =>
                                                              x.Key == ConfigQuantityName.MostView.ToString())
                                                          ?.Quantity ??
                                                      request.Params.PageSize;

                            query = query.OrderByDescending(x => x.ViewCount);
                            break;
                        case "home-new":
                            request.Params.PageSize = configQuantity
                                                          .FirstOrDefault(x =>
                                                              x.Key == ConfigQuantityName.NewRelease.ToString())
                                                          ?.Quantity ??
                                                      request.Params.PageSize;
                            query = query.OrderByDescending(x => x.CreateDate);
                            break;
                        case "popular":
                            query = query.OrderByDescending(x => x.ViewCount);
                            break;
                        case "newest":
                            query = query.OrderByDescending(x => x.CreateDate);
                            break;
                        case "low-price":
                            query = query.OrderBy(x =>
                                x.Attributes.FirstOrDefault(x => x.AttributeId.ToString() == attributeId)
                                    .Price);
                            break;
                        case "high-price":
                            query = query.OrderByDescending(x =>
                                x.Attributes.FirstOrDefault(x => x.AttributeId.ToString() == attributeId)
                                    .Price);
                            break;
                        case "best-selling":
                            request.Params.PageSize = configQuantity
                                                          .FirstOrDefault(x =>
                                                              x.Key == ConfigQuantityName.BestSelling.ToString())
                                                          ?.Quantity ??
                                                      request.Params.PageSize;
                            break;
                        case "on-sale":
                            request.Params.PageSize = configQuantity
                                                          .FirstOrDefault(x =>
                                                              x.Key == ConfigQuantityName.OnSale.ToString())
                                                          ?.Quantity ??
                                                      request.Params.PageSize;

                            query = query.Where(x => x.Attributes.FirstOrDefault(a => a.AttributeId.ToString() == attributeId).SalePriceEndDate >= DateTime.Now)
                                .OrderByDescending(x => x.Attributes.FirstOrDefault(a => a.AttributeId.ToString() == attributeId).SalePriceEndDate);
                            break;
                        case "deal-of-week":
                            request.Params.PageSize = configQuantity
                                                          .FirstOrDefault(x =>
                                                              x.Key == ConfigQuantityName.DealsOfWeek.ToString())
                                                          ?.Quantity ??
                                                      request.Params.PageSize;

                            query = query.Where(x =>  x.Attributes.FirstOrDefault(a => a.AttributeId.ToString() == attributeId).SalePriceEndDate >= DateTime.Now)
                                .OrderByDescending(x => x.Attributes.FirstOrDefault(a => a.AttributeId.ToString() == attributeId).TotalStock);
                            break;
                        default:
                            break;
                    }
                }


                var booksDto = query.Select(x => new BooksDto()
                {
                    Id = x.Id,
                    AttributeId = new Guid(attributeId),
                    AttributeName = x.Attributes
                        .FirstOrDefault(a => a.AttributeId.ToString() == attributeId).Attribute.Name,
                    AuthorId = x.Author.Id,
                    AuthorName = x.Author.Name,
                    Name = x.Name,
                    LanguageId = x.Language.Id,
                    LanguageName = x.Language.Name,
                    Price = x.Attributes.FirstOrDefault(a => a.AttributeId.ToString() == attributeId)
                        .Price,
                    SalePrice = x.Attributes.FirstOrDefault(a => a.AttributeId.ToString() == attributeId)
                        .Price,
                    PictureUrl = x.Media.FirstOrDefault(m => m.IsMain == true).Url,
                    StockStatus = (x.Attributes.FirstOrDefault(a => a.AttributeId.ToString() == request.Params.AttributeId).StockStatus).ToString(),
                    Categories = String.Join(",", x.Categories.Select(c => c.Category.Name)) ,
                    PublishDate = x.PublicationDate

                  
                }).AsQueryable();
                
                return Result<PagedList<BooksDto>>.Success
                    (await PagedList<BooksDto>.CreatePage(booksDto, request.Params.PageIndex, request.Params.PageSize));
            }
        }
        public IEnumerator GetEnumerator()
        {
            throw new NotImplementedException();
        }
    }
}