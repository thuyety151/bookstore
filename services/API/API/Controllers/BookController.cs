using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Books;
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
    }
}