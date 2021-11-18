using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Books;
using Application.Books.Detail;
using Application.Books.Upsert;
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
        public async Task<IActionResult> GetBooksForSale([FromQuery] BookParams bookParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() {Params = bookParams}));
        }

        [HttpPost]
        public async Task<IActionResult> UpsertBook(BookUpsertParams bookUpsertParams)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command() {BookParams = bookUpsertParams}));
        }
     }
}