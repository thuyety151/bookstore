using System;
using System.Threading.Tasks;
using Application.WishList.Items;
using Application.Core;
using Application.WishList;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class WishlistController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetWishlist([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new GetWishLists.Query() { Params = pagingParams}));
        }
        [HttpDelete("item")]
        public async Task<IActionResult> DeleteItem([FromQuery] Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command(){ Id = id}));
        }
        [HttpPost("item")]
        public async Task<IActionResult> UpsertItem(ItemParams item)
        {
            return HandleResult(await Mediator.Send(new Add.Command() {ItemParams = item}));
        }
        [HttpPost]
        public async Task<IActionResult> AddToCart(Guid id )
        {
            return HandleResult(await Mediator.Send(new AddToCart.Command(){ Id =id}));
        }
    }
}