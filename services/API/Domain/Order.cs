using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Enum;

namespace Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public int PaymentMethod { get; set; }
        public double SubTotal { get; set; }
        public double OrderFee { get; set; }
        public string OrderCode { get; set; }
        public string OrderNote { get; set; }
        public Guid UserId { get; set; }
        public Coupon Coupon { get; set; }
        public ICollection<Item> Items { get; set; }
        public Address AddressToShip { get; set; }
        public bool IsDeleted { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public long TransId { get; set; }
        public int ResultCode { get; set; }

        public double GetTotal()
        {
            return SubTotal + OrderFee;
        }
    }
}