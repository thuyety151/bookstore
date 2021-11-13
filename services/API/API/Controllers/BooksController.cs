using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Books;
using Application.Books.Detail;
using Application.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace API.Controllers
{
    public class BooksController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBook([FromQuery] Guid id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query() {Id = id}));
        }

        [HttpGet]
        [Route("books-for-sale")]
        public async Task<IActionResult> GetBooksForSale(BookParams bookParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() {Params = bookParams}));
        }
     }
}