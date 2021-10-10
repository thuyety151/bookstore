using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Books;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Carts
{
    public class GetCart
    {
        public class Query : IRequest<Result<PagedList<ItemDto>>>
        {
            public PagingParams Params { get; set; }
            public Guid Id { get; set; }

        }
        public class Handler : IRequestHandler<Query, Result<PagedList<ItemDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<PagedList<ItemDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var items = _context.CartItems.Include(x => x.Item).ThenInclude(x => x.Book)
                .Where(x => x.CartId == request.Id).Select(x => new ItemDto()
                {
                    Id = x.ItemId,
                    Cost = x.Item.Cost,
                    Quantity = x.Item.Quantity,
                    Total = x.Item.Total,
                    Book = _mapper.Map<BookDto>(x.Item.Book)
                }).AsQueryable();
                return Result<PagedList<ItemDto>>.Success(await PagedList<ItemDto>.CreatePage(items, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}