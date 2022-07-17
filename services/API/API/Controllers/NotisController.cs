using System;
using System.Threading.Tasks;
using Application.Carts;
using Application.Core;
using Application.Notification;
using Application.Notification.Admin;
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
        public async Task<IActionResult> GetAll()
        {
            return HandleResult(await Mediator.Send(new List.Query() ));
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
        [HttpGet]
        [Route("list-admin-noti")]
        public async Task<IActionResult> ListAdmin()
        {
            return HandleResult(await Mediator.Send(new ListAdmin.Query()));
        }
        [HttpPost]
        [Route("send")]
        public async Task<IActionResult> Send(SendNotiParams notiParams)
        {
            return HandleResult(await Mediator.Send(new SendNoti.Command(){SendNotiParams = notiParams}));
        }
        [HttpGet]
        [Route("list-noti")]
        public async Task<IActionResult> List()
        {
            return HandleResult(await Mediator.Send(new List.Query() ));
        }
        [HttpGet]
        [Route("total-unread")]
        public async Task<IActionResult> TotalUnread()
        {
            return HandleResult(await Mediator.Send(new TotalUnread.Query() ));
        }
    }
}