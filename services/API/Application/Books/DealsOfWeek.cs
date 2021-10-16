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
    public class DealsOfWeek
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

                var books = await _context.Coupons
                            .Where(x => (DateTime.Now <= (DateTime?)x.ExpireDate.AddDays(7)) == true)
                            .OrderByDescending(x => x.ExpireDate)
                            .SelectMany(x => x.Books)
                            .Where(x => x.Book.IsDeleted == false)
                            .Select(x => new BookDto()
                            {
                                Id = x.Book.Id,
                                Name = x.Book.Name,
                                Author = _mapper.Map<AuthorDto>(x.Book.Author),
                                Attribute = x.Book.Attribute,
                                Language = x.Book.Language,
                                Media = x.Book.Media
                            }).Take(request.Quantity).ToListAsync();
                return Result<List<BookDto>>.Success(books);
            }
        }
    }
}