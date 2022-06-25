using System;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Mvc;
using Application.Categories;
using Application.Categories.Admin;
using List = Application.Categories.List;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
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

        [HttpPost]
        public async Task<IActionResult> Upsert(CategoryParams categoryParams)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command() {CategoryParams = categoryParams}));
        }
        
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(Delete.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAll([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new GetAll.Query(){Params = pagingParams}));
        }
        
        [HttpGet]
        [Route("books-for-sale")]
        public async Task<IActionResult> GetAllForBooksForSale()
        {
            return HandleResult(await Mediator.Send(new CategoriesBooksForSale.Query(){}));
        }
        
        [HttpGet]
        [Route("flatten-categories")]
        public async Task<IActionResult> GetAllFlattenCategories()
        {
            return HandleResult(await Mediator.Send(new FlattenCategory.Query(){}));
        }

    }
}