using System;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Mvc;
using Application.Categories;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCategories([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() { Params = pagingParams }));
        }
        [HttpGet]
        [Route("root")]
        public async Task<IActionResult> GetRootCategories([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new ListRoot.Query() { Params = pagingParams }));
        }
        [HttpGet]
        [Route("sub")]
        public async Task<IActionResult> GetSubCategories([FromQuery] Guid id)
        {
            return HandleResult(await Mediator.Send(new ListSubCategories.Query() { Id = id }));
        }

    }
}