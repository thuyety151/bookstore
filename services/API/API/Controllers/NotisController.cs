using System;
using System.Threading.Tasks;
using Application.Carts;
using Application.Core;
using Application.Notification;
using Application.Notification.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [Authorize]
    public class NotisController:BaseApiController
    {
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateNoti(NotiParams notiParams)
        {
            return HandleResult(await Mediator.Send(new Create.Command(){NotiParams = notiParams}));
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() { Params = pagingParams}));
        }
        [HttpPost]
        [Route("read")]
        public async Task<IActionResult> ReadNoti(Guid? id,bool isReadAll )
        {
            return HandleResult(await Mediator.Send(new UpdateStatus.Command() { Id = id,IsReadAll = isReadAll}));
        }
        
        [HttpGet]
        [Route("list-admin-token")]
        public async Task<IActionResult> GetAdminTokens()
        {
            return HandleResult(await Mediator.Send(new ListAdminToken.Query(){}));
        }
    }
}