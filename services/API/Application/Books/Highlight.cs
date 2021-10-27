using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Domain;
using Domain.Enum;

namespace Application.Books
{
    public class Highlight : IRequest<Result<List<Item>>>
    {
        public class Handler : IRequestHandler<Highlight, Result<List<Item>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<Item>>> Handle(Highlight request, CancellationToken cancellationToken)
            {
                var quantity = _context.ConfigQuantities
                                .Where(x => x.Key == ConfigQuantityName.Highlight.ToString())
                                .Select(x => x.Quantity)
                                .SingleOrDefault();
                var items = await _context.WishLists.SelectMany(x => x.Items).Take(quantity).ToListAsync();
                return Result<List<Item>>.Success(items);
            }
        }
    }
}