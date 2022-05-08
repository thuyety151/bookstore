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
        public async Task<IActionResult> GetAuthors([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query(){Params = pagingParams}));
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
        
    }
}