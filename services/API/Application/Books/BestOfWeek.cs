using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Authors;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class BestOfWeek
    {
        public class Query : IRequest<Result<List<BookDto>>>
        {
            public int Quantity { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<BookDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<BookDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                if (request.Quantity <= 0)
                {
                    return Result<List<BookDto>>.Failure("Quantity is not valid");
                }
                var book = await _context.Orders
                            .Where(x => (DateTime.Now <= (DateTime?)x.CreateDate.AddDays(7)) == true)
                            .SelectMany(x => x.Items)
                            .Where(x => x.Book.IsDeleted == false)
                            .Select(x => new BookDto()
                            {
                                Id = x.Book.Id,
                                Name = x.Book.Name,
                                Author = _mapper.Map<AuthorDto>(x.Book.Author),
                                Attribute = x.Book.Attribute,
                                Language = x.Book.Language,
                                Media = x.Book.Media
                            }).ToListAsync();
                var items = book.GroupBy(x => x.Id).OrderByDescending(x => x.Count())
                            .Select(x => x.First()).Take(request.Quantity)
                            .ToList();
                return Result<List<BookDto>>.Success(items);
            }
        }
    }
}