using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders.Admin
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<OrderDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<OrderDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<OrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var order = _context.Orders
                    .Include(x => x.AddressToShip)
                    .Include(x => x.Items)
                    .Include(x => x.DeliveryMethod);
                
                var orderDtos = order.ProjectTo<OrderDto>(_mapper.ConfigurationProvider);
                
                return Result<PagedList<OrderDto>>.Success(
                    await PagedList<OrderDto>.CreatePage(orderDtos, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}