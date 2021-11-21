using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using MediatR;
using Persistence;

namespace Application.Orders.Admin
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly HttpClient _httpClient;
            
            public Handler(DataContext context)
            {
                _context = context;
                _httpClient = new HttpClient()
                {
                    BaseAddress = new Uri("https://dev-online-gateway.ghn.vn")
                };
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = _context.Orders.FirstOrDefault(x => x.Id.ToString() == request.Id && x.IsDeleted == false);
                if (order == null)
                {
                    return Result<Unit>.Failure("Order does not exist");
                }

                //turn flag isDeleted
                order.IsDeleted = true;
                
                //Cancel order in GHN
                _httpClient.DefaultRequestHeaders.Add("Token", "a907bd6b-3508-11ec-b514-aeb9e8b0c5e3");
                _httpClient.DefaultRequestHeaders.Add("ShopId", "82749");

                var url = string.Format("/shiip/public-api/v2/switch-status/cancel");

                var orderCodes = new
                {
                    order_codes = new[]
                    {
                        order.OrderCode
                    }
                };

                var orderCodesJson = JsonSerializer.Serialize(orderCodes);
                var requestContent = new StringContent(orderCodesJson, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(url, requestContent);
                
                if (!response.IsSuccessStatusCode)
                {
                    return Result<Unit>.Failure("Error when cancel order from Giao Hang Nhanh");
                }

                order.Status = _context.OrderStatus.FirstOrDefault(x => x.Key == "cancel")?.Name;
                
                var result = await _context.SaveChangesAsync() > 0;
                
                if (result == false)
                {
                    return Result<Unit>.Failure("Error when delete order");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}