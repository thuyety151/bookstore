using System;
using System.Threading.Tasks;
using Application.MoMo;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MoMoController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add(Create.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        
        [HttpPost("payment-notification")]
        public async Task<IActionResult> PaymentNotification(PaymentNotificationParams paymentNotificationParams)
        {
            return HandleResult(await Mediator.Send(new PaymentNotification.Command(){PaymentNotificationParams = paymentNotificationParams}));
        }
        
        [HttpPost("refund")]
        public async Task<IActionResult> Refund(Refund.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}