using System.Threading.Tasks;
using Application.Core;
using Application.Coupons;
using Application.Coupons.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CouponsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> ListCoupons([FromQuery] PagingParams pagingParams, string predicate)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() {Params = pagingParams, Predicate = predicate}));
        }

        [HttpPost]
        public async Task<IActionResult> UpsertCoupon(CouponParams couponParams)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command() {CouponParams = couponParams}));
        }
        
        [HttpDelete]
        public async Task<IActionResult> DeleteCoupon(Delete.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPost]
        [Authorize]
        [Route("save-user-coupon")]
        public async Task<IActionResult> SaveUserCoupon(SaveUserCoupon.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        
        [HttpGet]
        [Authorize]
        [Route("user-coupons")]
        public async Task<IActionResult> GetUserCoupons()
        {
            return HandleResult(await Mediator.Send(new ListUserCoupon.Query(){}));
        }
    }
}