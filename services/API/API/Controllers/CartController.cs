using System;
using System.Threading.Tasks;
using Application.Carts;
using Application.Carts.Items;
using Application.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class CartController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCart([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new GetCart.Query() { Params = pagingParams}));
        }
        [HttpDelete("item")]
        public async Task<IActionResult> DeleteItem([FromQuery] Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command(){ Id = id}));
        }
        [HttpPost("item")]
        public async Task<IActionResult> UpsertItem(ItemParams item)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command() {ItemParams = item}));
        }
    }
}