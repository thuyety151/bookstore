using System.Threading.Tasks;
using Application.Core;
using Application.Languages;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LanguagesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetLanguages([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() {Params = pagingParams}));
        }
    }
}