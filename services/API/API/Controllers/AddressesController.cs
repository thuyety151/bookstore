using System;
using System.Threading.Tasks;
using Application.Addresses;
using Application.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class AddressesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAddresses([FromQuery] PagingParams pagingParams)
        {
            return HandleResult(await Mediator.Send(new List.Query() { Params = pagingParams }));
        }
        [HttpPost]
        public async Task<IActionResult> UpsertAddress(AddressParams addressParams)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command() { AddressParams = addressParams }));
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteAddress([FromQuery] Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command() { Id = id }));
        }
        [HttpPost]
        [Route("set-default")]
        public async Task<IActionResult> SetDefaultAddress([FromQuery] Guid id)
        {
            return HandleResult(await Mediator.Send(new SetDefault.Command() { Id = id }));
        }
        [HttpGet]
        [Route("get-default")]
        public async Task<IActionResult> GetDefaultAddress()
        {
            return HandleResult(await Mediator.Send(new GetDefault.Query() { }));
        }
    }
}