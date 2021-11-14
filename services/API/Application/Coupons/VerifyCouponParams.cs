using System.Collections.Generic;
namespace Application.Coupons
{
    public class VerifyCouponParams
    {
        public string Code { get; set; }
        public List<ItemDto> Items { get; set; }
    }
}