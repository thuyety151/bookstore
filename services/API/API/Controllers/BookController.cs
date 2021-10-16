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
        [Route("new-release")]
        public async Task<IActionResult> GetBooksByCategories([FromBody] List<string> idCategories)
        {
            return HandleResult(await Mediator.Send(new NewRelease.Query() { IdCategories = idCategories }));
        }
        [HttpGet]
        [Route("most-view")]
        public async Task<IActionResult> GetTopView()
        {
            return HandleResult(await Mediator.Send(new TopView()));
        }
        [HttpGet]
        [Route("best-week")]
        public async Task<IActionResult> GetBestOfWeek()
        {
            return HandleResult(await Mediator.Send(new BestOfWeek()));
        }
        [HttpGet]
        [Route("deals-of-week")]
        public async Task<IActionResult> GetDealsOfWeek()
        {
            return HandleResult(await Mediator.Send(new DealsOfWeek()));
        }
        [HttpGet]
        [Route("on-sale")]
        public async Task<IActionResult> GetOnSale([FromQuery] PagingParams pagingParams)
        {
            return HandleResult(await Mediator.Send(new OnSale.Query() { Params = pagingParams }));
        }
    }
}