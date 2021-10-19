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
using Application.Authors;
using Domain.Enum;

namespace Application.Books
{
    public class Highlight : IRequest<Result<List<BookDto>>>
    {
        public class Handler : IRequestHandler<Highlight, Result<List<BookDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<BookDto>>> Handle(Highlight request, CancellationToken cancellationToken)
            {
                var quantity = _context.ConfigQuantities
                                .Where(x => x.Key == ConfigQuantityName.Highlight.ToString())
                                .Select(x => x.Quantity)
                                .SingleOrDefault();
                var items = await _context.WishLists.SelectMany(x => x.Items)
                            .Where(x => x.Book.IsDeleted == false)
                            .Select(x => _mapper.Map<BookDto>(x.Book)).Take(quantity).ToListAsync();
                return Result<List<BookDto>>.Success(items);
            }
        }
    }
}