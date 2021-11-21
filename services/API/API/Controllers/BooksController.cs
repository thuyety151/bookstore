using System;
using System.Threading.Tasks;
using Application.Books;
using Application.Books.Detail;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BooksController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBook([FromQuery] Guid id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query() { Id = id }));
        }

        [HttpGet]
        [Route("books-for-sale")]
        public async Task<IActionResult> GetBooksForSale([FromQuery] BookParams bookParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() { Params = bookParams }));
        }

        [HttpGet]
        [Route("new-releases")]
        public async Task<IActionResult> GetNewReleases()
        {
            return HandleResult(await Mediator.Send(new NewReleases.Query() { }));
        }
    }
}