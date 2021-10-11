using System.ComponentModel;
using System;
using System.Data;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Application.Books
{
    public class ListNewRelease
    {
        public class Query : IRequest<Result<List<BooksCategoriesDto>>>
        {
            public NewReleaseQuery Params { get; set; }
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
                var actualQuantity = _context.Categories.Where(x => request.Params.IdCategories.Contains(x.Id.ToString()) && x.IsDeleted == false).ToList().Count;
                if (request.Params.IdCategories.Count != actualQuantity)
                {
                    //return BadReuqest
                    //please review these codes
                    return Result<List<BooksCategoriesDto>>.Failure("Bad request");
                }
                var results = await _context.Categories.Include(x => x.Books).Where(x => request.Params.IdCategories.Contains(x.Id.ToString()))
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
                                Author = x.Book.Author,
                                Attribute = x.Book.Attribute,
                                Language = x.Book.Language
                            })
                            .Take(request.Params.Quantity).ToList()
                        }).ToListAsync();
                return Result<List<BooksCategoriesDto>>.Success(results);
            }
        }
    }
}