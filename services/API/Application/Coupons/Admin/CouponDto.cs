using System;

namespace Application.Coupons.Admin
{
    public class CouponDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public double CouponAmount { get; set; }
        public string DiscountType { get; set; }
        public DateTime ExpireDate { get; set; }
    }
}