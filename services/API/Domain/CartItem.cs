using System;
using System.Collections.Generic;

namespace Domain
{
    public class CartItem
    {
        public Guid CartId { get; set; }
        public Cart Cart { get; set; }
        public Guid ItemId { get; set; }
        public Item Item { get; set; }
    }
}