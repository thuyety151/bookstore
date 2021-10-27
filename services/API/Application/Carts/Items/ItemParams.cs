using System;

namespace Application.Carts.Items
{
    public class ItemParams
    {
        public Guid ProductId { get; set; }
        public Guid AttributeId { get; set; }
        public int Quantity { get; set; }
    }
}