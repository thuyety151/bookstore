using System;

namespace Application.WishList.Items
{
    public class ItemParams
    {
        public Guid ProductId { get; set; }
        public Guid AttributeId { get; set; }
        public int Quantity { get; set; }
    }
}