using API.Extensions;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null)
            {
                return NotFound();
            }

            if (result.IsSuccess == true && result.Value != null)
            {
                return Ok(result);
            }

            if (result.IsSuccess == true && result.Value == null)
            {
                return NotFound();
            }
            // temp
            if (result.IsSuccess == false)
            {
                return Ok(result);
            }
            return BadRequest(result.Error);
        }

        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            if (result == null)
            {
                return NotFound();
            }

            if (result.Value.Count == 0)
            {
                return BadRequest(result.Error);
            }

            if (result.IsSuccess == true && result.Value != null)
            {
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize, result.Value.TotalPage, result.Value.TotalCount);
                return Ok(result);
            }

            if (result.IsSuccess == true && result.Value == null)
            {
                return NotFound();
            }

            return BadRequest(result.Error);
        }
    }
}