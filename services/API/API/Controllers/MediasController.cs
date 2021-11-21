using System.Threading.Tasks;
using Application.Medias;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MediasController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command() {Id = id}));
        }
    }
}