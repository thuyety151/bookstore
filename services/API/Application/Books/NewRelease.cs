using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Application.Authors;
using Domain.Enum;

namespace Application.Books
{
    public class NewRelease
    {
        public class Query : IRequest<Result<List<BooksCategoriesDto>>>
        {
            public List<string> IdCategories { get; set; }
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
                // check valid request params
                var actualQuantity = _context.Categories.Where(x => request.IdCategories.Contains(x.Id.ToString()) && x.IsDeleted == false).ToList().Count;
                if (request.IdCategories.Count != actualQuantity)
                {
                    //return BadReuqest
                    //please review these codes
                    return Result<List<BooksCategoriesDto>>.Failure("Bad request");
                }
                var quantity = await _context.ConfigQuantities
                                    .Where(x => x.Key == ConfigQuantityName.NewRelease.ToString()).Select(x => x.Quantity).SingleOrDefaultAsync();

                var results = await _context.Categories.Include(x => x.Books).Where(x => request.IdCategories.Contains(x.Id.ToString()))
                        .Select(x => new BooksCategoriesDto()
                        {
                            CategoryId = x.Id,
                            CategoryName = x.Name,
                            Books = x.Books.Where(x => x.Book.IsDeleted == false).OrderByDescending(x => x.Book.CreateDate)
                            .Select(x => new BookDto()
                            {
                                Id = x.BookId,
                                Name = x.Book.Name,
                                Price = x.Book.Price,
                                SalePrice = x.Book.SalePrice,
                                Media = x.Book.Media,
                                Author = _mapper.Map<AuthorDto>(x.Book.Author),
                                Attribute = x.Book.Attribute,
                                Language = x.Book.Language
                            })
                            .Take(quantity).ToList()
                        }).ToListAsync();
                return Result<List<BooksCategoriesDto>>.Success(results);
            }
        }
    }
}