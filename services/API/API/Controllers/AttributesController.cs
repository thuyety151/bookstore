using System.Threading.Tasks;
using Application.Attributes;
using Application.Core;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AttributesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAtributes([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() {Params = pagingParams}));
        }
    }
}