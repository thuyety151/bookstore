using System;
using System.ComponentModel;
namespace Domain
{
    public class BookCoupon
    {
        public Guid BookId { get; set; }
        public Book Book { get; set; }
        public Guid CouponId { get; set; }
        public Coupon Coupon { get; set; }
    }
}