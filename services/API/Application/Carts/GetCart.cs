using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Books;
using Application.Core;
using AutoMapper;
using Domain;
using Domain.Enum;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Carts
{
    public class GetCart
    {
        public class Query : IRequest<Result<PagedList<Item>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<Item>>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }

            public async Task<Result<PagedList<Item>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var items = _context.Carts.Where(x =>
                        x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier))
                    .SelectMany(x => x.Items);

                foreach (var item in items)
                {
                    var book = _context.Books.FirstOrDefault(x => x.Id == item.ProductId);

                    if (book != null)
                    {
                        var stock = book.TotalStock;
                        if (DateTime.Now >= book.SalePriceStartDate && DateTime.Now <= book.SalePriceEndDate)
                        {
                            item.Price = book.SalePrice;
                        }
                        if (item.Quantity > stock)
                        {
                            item.StockStatus = (int) StockStatus.OutOfStock;
                        }
                    }
                }

                return Result<PagedList<Item>>.Success(
                    await PagedList<Item>.CreatePage(items, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}