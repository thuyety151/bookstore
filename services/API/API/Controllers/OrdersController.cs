using System.Threading.Tasks;
using Application.Core;
using Application.Orders.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderParams = Application.Orders.OrderParams;
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

        [HttpGet]
        public async Task<IActionResult> ListOrder(PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() {Params = pagingParams}));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command() {Id = id}));
        }
    }
}