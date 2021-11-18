using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Books.Upsert
{
    public class Upsert
    {
        public class Command : IRequest<Result<Guid>>
        {
            public BookUpsertParams BookParams { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Guid>>
        {
            private readonly DataContext _context;
            private readonly IMediaAccessor _mediaAccessor;

            public Handler(DataContext context, IMediaAccessor mediaAccessor)
            {
                _context = context;
                _mediaAccessor = mediaAccessor;
            }
            public async  Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Add
                if(request.BookParams.Id == default(Guid))
                {
                    var book = new Book()
                    {
                        Id = new Guid(),
                        Author = _context.Authors.FirstOrDefault(x => x.Id.ToString() == request.BookParams.AuthorId),
                        Categories = new List<BookCategory>(),
                        Coupons = new List<BookCoupon>(),
                        CreateDate = DateTime.Now,
                        Description = request.BookParams.Description,
                        Dimensions = request.BookParams.Dimensions,
                        IsDeleted = false,
                        IsPublic = request.BookParams.IsPublic,
                        Name = request.BookParams.Name,
                        ShortDescription = request.BookParams.ShortDescription,
                        UpdateDate = DateTime.Now,
                        ViewCount = 0,
                        Media = new List<Media>(),
                        Language = _context.Languages.FirstOrDefault(x =>
                            x.Id.ToString() == request.BookParams.LanguageId),
                        PublicationDate = request.BookParams.PublicationDate,
                        Publisher = request.BookParams.Publisher,
                        PublicationCountry = request.BookParams.PublicationCountry,
                        Attributes = new List<BookAttribute>()
                    };

                    foreach (var attribute in request.BookParams.Attributes)
                    {
                        var bookAttribute = new BookAttribute()
                        {
                            BookId = book.Id,
                            AttributeId = attribute.AttributeId,
                            Price = attribute.Price,
                            SalePrice = attribute.SalePrice,
                            SalePriceStartDate = attribute.SalePriceStartDate,
                            SalePriceEndDate = attribute.SalePriceEndDate,
                            StockStatus = attribute.StockStatus,
                            TotalStock = attribute.TotalStock
                        };
                        book.Attributes.Add(bookAttribute);
                    }

                    var categories =
                        _context.Categories.Where(x => request.BookParams.CategoryIds.Contains(x.Id.ToString()));

                    foreach (var category in categories)
                    {
                        var bookCategory = new BookCategory()
                        {
                            Category = category
                        };
                        book.Categories.Add(bookCategory);
                    }
                    
                    //Add main photo
                    if (!(string.IsNullOrWhiteSpace(request.BookParams.MainMediaId)))
                    {
                        var photo = _context.Media.FirstOrDefault(
                            x => x.Id == request.BookParams.MainMediaId);
                        
                        if (photo != null)
                        {
                            photo.IsMain = true;
                            photo.IsVideo = false;
                            photo.Name = book.Name;
                            
                            book.Media.Add(photo);
                        }
                    }
                    
                    await _context.Books.AddAsync(book);
                    await _context.SaveChangesAsync();
                    return Result<Guid>.Success(book.Id);
                }
                
                return Result<Guid>.Failure("Error when adding");
            }
        }
    }
}