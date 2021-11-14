using System;
namespace Application.Coupons
{
    public class CouponDto
    {
        public Guid Id { get; set; }
        public double CouponAmount { get; set; }
        public string Code { get; set; }
        public string DiscountType { get; set; }
    }
}