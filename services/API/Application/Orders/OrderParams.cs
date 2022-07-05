using System;
using System.Collections.Generic;
using Application.Addresses;
using Application.Books;
using Application.Coupons;
using Domain;

namespace Application.Orders
{
    public class OrderParams
    {
        public List<string> ItemIds { get; set; }
        public Guid AddressId { get; set; }
        public string CouponId { get; set; }
        public string OrderNote { get; set; }
        public Address Address { get; set; }
        public double OrderFee { get; set; }
        public int PaymentMethod { get; set; }
    }
}