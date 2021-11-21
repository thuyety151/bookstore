using System.Threading.Tasks;
using Application.Coupons;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CouponsController : BaseApiController
    {
        [HttpPost]
        [Route("verify")]
        public async Task<IActionResult> VerifyCoupon(VerifyCouponParams verifyCouponParams)
        {
            return HandleResult(await Mediator.Send(new VerifyCoupon.Query() { VerifyCouponParams = verifyCouponParams }));
        }
    }
}