using System;

namespace Domain
{
    public class UserCoupon
    {
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public Guid CouponId { get; set; }
        public Coupon Coupon { get; set; }
        public bool IsUsed { get; set; }

        public bool IsExpired => Coupon.IsDeleted == false && Coupon.ExpireDate <= DateTime.Now;
    }
}