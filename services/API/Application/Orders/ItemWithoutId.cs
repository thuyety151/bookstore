using System;
namespace Application.Orders
{
    public class ItemWithoutId
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; }
        public Guid AttributeId { get; set; }
        public string AttributeName { get; set; }
        public string PictureUrl { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string StockStatus { get; set; } 
    }
}