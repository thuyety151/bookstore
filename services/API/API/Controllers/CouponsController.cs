using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Books;
using Application.Books.Detail;
using Application.Core;
using Application.Coupons;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

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