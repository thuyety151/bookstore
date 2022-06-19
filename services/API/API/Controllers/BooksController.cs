using System;
using System.Threading.Tasks;
using Application.Books;
using Application.Books.Detail;
using Application.Books.Upsert;
using Application.Core;
using Microsoft.AspNetCore.Http;
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
        [Route("admin")]
        public async Task<IActionResult> GetListAdmin([FromQuery] PagingParams pagingParams,string status,string keywords)
        {
            return HandlePagedResult(await Mediator.Send(new ListAdmin.Query() { Params = pagingParams ,Status = status,Keywords = keywords}));
        }


        [HttpGet]
        [Route("new-releases")]
        public async Task<IActionResult> GetNewReleases()
        {
            return HandleResult(await Mediator.Send(new NewReleases.Query() { }));
        }
        [HttpPost]
        public async Task<IActionResult> UpsertBook(BookUpsertParams bookUpsertParams)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command() { BookParams = bookUpsertParams }));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBook(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command() { Id = id }));
        }

        [HttpGet]
        [Route("best-selling")]
        public async Task<IActionResult> GetBestselling()
        {
            return HandleResult(await Mediator.Send(new BestSelling.Query() { }));
        }
    }
}