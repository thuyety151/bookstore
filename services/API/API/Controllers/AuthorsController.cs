using System;
using System.Threading.Tasks;
using Application.Authors;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAuthors([FromQuery] PagingParams pagingParams, string predicate,string keywords)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query(){Predicate = predicate, Params = pagingParams,Keywords = keywords}));
        }
        
        [HttpGet("search")]
        public async Task<IActionResult> GetAuthorsForSale([FromQuery] string searchString)
        {
            return HandleResult(await Mediator.Send(new AuthorsForSale.Query(){SearchString = searchString}));
        }

        [HttpPost]
        public async Task<IActionResult> Upsert(Author authorParams)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command() { AuthorParams = authorParams }));
        }
        [HttpGet("detail")]
        public async Task<IActionResult> GetAuthorsById([FromQuery] Guid id)
        {
            return HandleResult(await Mediator.Send(new AuthorDetail.Query(){Id = id}));
        }
    }
}