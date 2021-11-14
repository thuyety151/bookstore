using System.Collections.Generic;
using Domain;

namespace Application.Coupons
{
    public class VerifyCouponParams
    {
        public string Code { get; set; }
        public List<Item> Items { get; set; }
    }
}