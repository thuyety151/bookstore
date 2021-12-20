using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Coupons;
using Domain;

namespace Application.Orders.Admin
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public int PaymentMethod { get; set; }
        public double OrderFee { get; set; }
        public double SubTotal { get; set; }
        public string OrderNote { get; set; }
        public string OrderCode { get; set; }
        public Guid DeliveryMethodId { get; set; }
        public ICollection<ItemDto> Items { get; set; }
        public Coupon Coupon { get; set; }
        public Address AddressToShip { get; set; }
        public double Total { get; set; }
        public double GetTotal()
        {
            return SubTotal + OrderFee;
        }
    }
}