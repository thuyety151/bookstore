using System;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Constant;
using Domain.Enum;
using MediatR;
using Microsoft.AspNetCore.Http;
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
            public string Status { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<OrderDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly HttpClient _httpClient;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IMapper mapper, IHttpContextAccessor httpContext)
            {
                _context = context;
                _mapper = mapper;
                _httpClient = new HttpClient()
                {
                    BaseAddress = new Uri("https://dev-online-gateway.ghn.vn"),
                };
                _httpContext = httpContext;
            }

            public async Task<Result<PagedList<OrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = _context.Orders
                    .Include(x => x.AddressToShip)
                    .Include(x => x.Items)
                    .OrderByDescending(x => x.OrderDate)
                    .Where(x => x.IsDeleted == false).AsQueryable();

                var user = _context.Users.SingleOrDefault(x => x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
                if (user?.Role == Role.Customer)
                {
                    orders = orders.Where(x => x.UserId == Guid.Parse(user.Id)).AsQueryable();
                    request.Params.PageSize = orders.Any() ?orders.Count():1 ;
                }

                // Get status from GHN API
                // _httpClient.DefaultRequestHeaders.Add("Token", "a907bd6b-3508-11ec-b514-aeb9e8b0c5e3");
                // foreach (var order in orders)
                // {
                //     var url = string.Format("/shiip/public-api/v2/shipping-order/detail?order_code={0}", order.OrderCode);
                //
                //     var response = await _httpClient.GetAsync(url);
                //
                //     // if (!response.IsSuccessStatusCode)
                //     // {
                //     //     return Result<PagedList<OrderDto>>.Failure("Order does not exist in GiaoHangNhanh");
                //     // }
                //     if (response.IsSuccessStatusCode)
                //     {
                //         var orderDetailGhn =
                //             JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                //
                //         var statusGhn = (string) orderDetailGhn.data.status;
                //
                //         order.Status = _context.OrderStatus.FirstOrDefault(x => x.Key == statusGhn)?.Name;
                //     }
                // }

               // await _context.SaveChangesAsync();
                if (request.Status != null)
                {
                    if (request.Status == "Payment Failed")
                    {
                        orders = orders.Where(x => x.PaymentStatus == PaymentStatus.Failed );
                    }
                    else
                    {
                        orders = orders.Where(x => x.Status == request.Status && x.PaymentStatus != PaymentStatus.Failed);

                    }
                }

                var orderDtos = orders.ProjectTo<OrderDto>(_mapper.ConfigurationProvider);

                return Result<PagedList<OrderDto>>.Success(
                    await PagedList<OrderDto>.CreatePage(orderDtos, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}