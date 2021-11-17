using System;
using System.Collections.Generic;
using Application.Books;
using Application.Coupons;
using Domain;

namespace Application.Orders
{
    public class OrderParams
    {
        public List<string> ItemIds { get; set; }
        public Guid AddressId { get; set; }
        public VerifyCouponParams Coupon { get; set; }
        public string OrderNote { get; set; }
    }
}