using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Books;
using Application.Core;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookController : BaseApiController
    {
        [HttpGet]
        [Route("bycategory")]
        public async Task<IActionResult> GetBooksByCategories([FromBody] NewReleaseQuery Params)
        {
            return HandleResult(await Mediator.Send(new ListNewRelease.Query() { Params = Params }));
        }
        [HttpGet]
        [Route("top-view/{quantity}")]
        public async Task<IActionResult> GetTopView(int quantity)
        {
            return HandleResult(await Mediator.Send(new TopView.Query() { Quantity = quantity }));
        }
        [HttpGet]
        [Route("best-week/{quantity}")]
        public async Task<IActionResult> GetBestOfWeek(int quantity)
        {
            return HandleResult(await Mediator.Send(new BestOfWeek.Query() { Quantity = quantity }));
        }
        [HttpGet]
        [Route("deals-of-week/{quantity}")]
        public async Task<IActionResult> GetDealsOfWeek(int quantity)
        {
            return HandleResult(await Mediator.Send(new DealsOfWeek.Query() { Quantity = quantity }));
        }
        [HttpGet]
        [Route("on-sale")]
        public async Task<IActionResult> GetOnSale([FromQuery] PagingParams pagingParams)
        {
            return HandleResult(await Mediator.Send(new OnSale.Query() { Params = pagingParams }));
        }
    }
}