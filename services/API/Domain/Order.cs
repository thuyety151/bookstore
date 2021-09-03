using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public DateTime CreateDate { get; set; }
        public int PaymentMethod { get; set; }
        public double SubTotal { get; set; }
        public double ShippingFee { get; set; }
        public double OrderTotal { get; set; }
        public int Status { get; set; }
        public AppUser Customer { get; set; }
        public Bill Bill { get; set; }
        public ICollection<Item> Items { get; set; }


    }
}