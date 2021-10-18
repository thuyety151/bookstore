using System;
using System.Threading.Tasks;
using Application.Carts;
using Application.Core;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCart(Guid id, [FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new GetCart.Query() { Params = pagingParams, Id = id }));
        }
    }
}