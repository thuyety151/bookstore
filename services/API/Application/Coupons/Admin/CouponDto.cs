using System;
using Domain;

namespace Application.Coupons.Admin
{
    public class CouponDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public double CouponAmount { get; set; }
        public int DiscountType { get; set; }
        public DateTime ExpireDate { get; set; }
        public string ImageUrl { get; set; }
        public double MinSpend { get; set; }
        public bool IsUsed { get; set; }
        public bool IsExpired { get; set; }
        public Media Media { get; set; }
    }
}