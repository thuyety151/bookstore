using System;
using System.Threading.Tasks;
using Application.MoMo;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MoMoController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add(Guid orderId)
        {
            return HandleResult(await Mediator.Send(new Create.Command() {OrderId = orderId}));
        }
    }
}