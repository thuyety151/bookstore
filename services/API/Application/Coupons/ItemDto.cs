using System;
namespace Application.Coupons
{
    public class ItemDto
    {
        public Guid Id { get; set; }
        public double SubTotal { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string AttributeName { get; set; }
        public Guid ProductId { get; set; }
        public double SalePrice { get; set; }
    }
}