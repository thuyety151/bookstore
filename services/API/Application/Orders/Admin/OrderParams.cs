using System;
using System.Collections.Generic;

namespace Application.Orders.Admin
{
    public class OrderParams
    {
        public Guid Id { get; set; }
        public string CustomerId { get; set; }
        public Guid AddressId { get; set; }
        public string OrderNote { get; set; }
    }
}