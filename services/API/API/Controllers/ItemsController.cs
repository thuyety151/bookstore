using System;
using System.Threading.Tasks;
using Application.Items;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemsController : BaseApiController
    {
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Query() { Id = id }));
        }
    }
}