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
        
        [HttpDelete]
        public async Task<IActionResult> DeleteAttribute(Delete.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPost]
        public async Task<IActionResult> UpsertAttribute(AttributeParams attributeParams)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command() {AttributeParams = attributeParams}));
        }
    }
}