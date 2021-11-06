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
    public class DealsOfWeek : IRequest<Result<List<BookDto>>>
    {
        public class Handler : IRequestHandler<DealsOfWeek, Result<List<BookDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<BookDto>>> Handle(DealsOfWeek request, CancellationToken cancellationToken)
            {
                var config = await _context.ConfigQuantities
                                    .Where(x => x.Key == ConfigQuantityName.DealsOfWeek.ToString()).Select(x => new
                                    {
                                        Quantity = x.Quantity,
                                        DefaulAttributeId = x.DefaultAttributeId
                                    }).SingleOrDefaultAsync();
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
                                AttributeId = x.Book.Attributes.FirstOrDefault(x => x.AttributeId == config.DefaulAttributeId).AttributeId,
                                AttributeName = x.Book.Attributes.FirstOrDefault(x => x.AttributeId == config.DefaulAttributeId).Attribute.Name,
                                Language = x.Book.Language,
                                Media = x.Book.Media
                            }).Take(config.Quantity).ToListAsync();
                return Result<List<BookDto>>.Success(books);
            }
        }
    }
}