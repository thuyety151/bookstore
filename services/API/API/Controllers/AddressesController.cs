using System.Threading.Tasks;
using Application.Addresses;
using Application.Core;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Authorize]
    public class AddressesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAddresses([FromQuery] PagingParams pagingParams)
        {
            return HandleResult(await Mediator.Send(new List.Query() { Params = pagingParams }));
        }
    }
}