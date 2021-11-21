using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;
namespace Application.Books
{
    public class NewReleases
    {
        public class Query : IRequest<Result<List<BooksCategoriesDto>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<List<BooksCategoriesDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<BooksCategoriesDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categories = await _context.ConfigHomePages
                    .SingleOrDefaultAsync(x => x.Key == ConfigQuantityName.NewRelease.ToString());

                var query = _context.Books
                    .Include(x => x.Categories)
                    .Include(x => x.Author)
                    .Include(x => x.Language)
                    .Include(x => x.Attributes)
                    .ThenInclude(x => x.Attribute)
                    .Include(x => x.Media)
                    .Where(x => x.IsPublic == true && x.IsDeleted == false)
                    .AsQueryable();

                var results = new List<BooksCategoriesDto>();
                foreach (var categoryId in JsonConvert.DeserializeObject<Guid[]>(categories.MetaData))
                {
                    var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == categoryId && c.IsDeleted == false);
                    if (category == null)
                    {
                        continue;
                    }
                    var books = query.Where(
                            x => x.Categories.Any(c => c.CategoryId == categoryId))
                        // .OrderByDescending(x=>x.Attributes.Select(x=>x.TotalStock))
                        .OrderByDescending(b => b.CreateDate)
                        .Select(x => new BooksDto()
                        {
                            Id = x.Id,
                            AttributeId = x.Attributes.OrderByDescending(a => a.TotalStock).FirstOrDefault().AttributeId,
                            AttributeName = x.Attributes.OrderByDescending(a => a.TotalStock).FirstOrDefault().Attribute.Name,
                            AuthorId = x.Author.Id,
                            AuthorName = x.Author.Name,
                            Name = x.Name,
                            LanguageId = x.Language.Id,
                            LanguageName = x.Language.Name,
                            Price = x.Attributes.FirstOrDefault()
                                .Price,
                            SalePrice = x.Attributes.FirstOrDefault()
                                .Price,
                            PictureUrl = x.Media.FirstOrDefault(m => m.IsMain == true).Url
                        })
                        .ToList();
                    var newRelease = new BooksCategoriesDto()
                    {
                        CategoryId = category.Id,
                        CategoryName = category.Name,
                        Books = books
                    };
                    results.Add(newRelease);
                }
                return Result<List<BooksCategoriesDto>>.Success(results);
            }
        }
    }
}