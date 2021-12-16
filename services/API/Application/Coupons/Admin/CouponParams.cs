using System;

namespace Application.Coupons.Admin
{
    public class CouponParams
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public double CouponAmount { get; set; }
        public int DiscountType { get; set; }
        public DateTime ExpireDate { get; set; }
        public double MinSpend { get; set; }
      
    }
}