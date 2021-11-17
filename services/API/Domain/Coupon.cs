using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    public class Coupon
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public double CouponAmount { get; set; }
        public int DiscountType { get; set; }
        public DateTime ExpireDate { get; set; }
        public double MinSpend { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<BookCoupon> Books{ get; set; }
    }
}