using System.Threading.Tasks;
using Application.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Upsert = Application.Orders.Upsert;
namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderParams orderParams)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command(){OrderParams = orderParams}));
        }
    }
}