using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Authors;
using Application.Core;
using AutoMapper;
using Domain;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class BestOfWeek : IRequest<Result<List<BookDto>>>
    {
        public class Handler : IRequestHandler<BestOfWeek, Result<List<BookDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<BookDto>>> Handle(BestOfWeek request, CancellationToken cancellationToken)
            {
                var quantity = await _context.ConfigQuantities
                                    .Where(x => x.Key == ConfigQuantityName.BestOfWeek.ToString()).Select(x => x.Quantity).SingleOrDefaultAsync();

                var orderItem = _context.Orders
                    .Where(x => (DateTime.Now <= (DateTime?) x.OrderDate.AddDays(7)) == true)
                    .SelectMany(x => x.Items).ToList();

                var books = orderItem.GroupBy(x => x.ProductId).OrderByDescending(x => x.Count())
                    .Select(x => x.First()).Take(quantity);

                List<BookDto> bookDtos = new List<BookDto>();
                foreach (var book in books)
                {
                    var bookDto = _context.Books.Where(x => x.Id == book.Id)
                        .Select(x => new BookDto()
                        {
                            Id = x.Id,
                            Name = x.Name,
                            Author = _mapper.Map<AuthorDto>(x.Author),
                            Language = x.Language,
                            Media = x.Media,
                            Price = x.Price
                        }).FirstOrDefault();

                    if (bookDto != null)
                    {
                        bookDto.AttributeId = book.AttributeId;
                        bookDto.AttributeName = book.AttributeName;
                        bookDtos.Add(bookDto);
                    }
                }
                return Result<List<BookDto>>.Success(bookDtos);
            }
        }
    }
}