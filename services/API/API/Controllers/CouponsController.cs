using System.Threading.Tasks;
using Application.Core;
using Application.Coupons;
using Application.Coupons.Admin;
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

        [HttpGet]
        public async Task<IActionResult> ListCoupons([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() {Params = pagingParams}));
        }
    }
}