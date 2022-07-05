using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Domain
{
    public class Item
    {
        public Guid Id { get; set; }
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
        public Guid? OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        public bool IsReviewed { get; set; }
    }
}