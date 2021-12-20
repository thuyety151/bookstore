using System;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography.Xml;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Coupons;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;

namespace Application.Orders.Admin
{
    public class Detail
    {
        public class Query : IRequest<Result<OrderDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<OrderDto>>
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

            public async Task<Result<OrderDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var order = _context.Orders
                    .Include(x => x.AddressToShip)
                    .Include(x => x.Items).SingleOrDefault(x => x.IsDeleted == false && x.Id == request.Id);

                //Get status from GHN API
                if (order != null)
                {
                    _httpClient.DefaultRequestHeaders.Add("Token", "a907bd6b-3508-11ec-b514-aeb9e8b0c5e3");
                    var url = string.Format("/shiip/public-api/v2/shipping-order/detail?order_code={0}", order.OrderCode);

                    var response = await _httpClient.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        var orderDetailGhn =
                         JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());

                        var statusGhn = (string)orderDetailGhn.data.status;

                        order.Status = _context.OrderStatus.FirstOrDefault(x => x.Key == statusGhn)?.Name;
                    }

                    await _context.SaveChangesAsync();

                    return Result<OrderDto>.Success(_mapper.Map<OrderDto>(order));
                }
                return Result<OrderDto>.Failure("Not found");
            }
        }
    }
}