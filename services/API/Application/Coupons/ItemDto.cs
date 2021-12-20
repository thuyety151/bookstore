using System;
namespace Application.Coupons
{
    public class ItemDto
    {
        public Guid Id { get; set; }
        public double SubTotal { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string PictureUrl { get; set; }
        public double Price { get; set; }
    }
}