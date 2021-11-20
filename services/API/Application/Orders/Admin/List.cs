using System;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
            private readonly HttpClient _httpClient;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
                _httpClient = new HttpClient()
                {
                    BaseAddress = new Uri("https://dev-online-gateway.ghn.vn"),
                };
            }

            public async Task<Result<PagedList<OrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = _context.Orders
                    .Include(x => x.AddressToShip)
                    .Include(x => x.Items)
                    .Include(x => x.DeliveryMethod)
                    .Where(x => x.IsDeleted == false);
                
                //Get status from GHN API
                _httpClient.DefaultRequestHeaders.Add("Token", "a907bd6b-3508-11ec-b514-aeb9e8b0c5e3");
                foreach (var order in orders)
                {
                    var order_code = "Z81QA";
                    var url = string.Format("/shiip/public-api/v2/shipping-order/detail?order_code={0}", order_code);

                    var response = await _httpClient.GetAsync(url);

                    if (!response.IsSuccessStatusCode)
                    {
                        return Result<PagedList<OrderDto>>.Failure("Order does not exist in GiaoHangNhanh");
                    }

                    var orderDetailGhn =
                        JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());

                    var status = (string) orderDetailGhn.data.status;

                }
                
                var orderDtos = orders.ProjectTo<OrderDto>(_mapper.ConfigurationProvider);
                
                return Result<PagedList<OrderDto>>.Success(
                    await PagedList<OrderDto>.CreatePage(orderDtos, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}