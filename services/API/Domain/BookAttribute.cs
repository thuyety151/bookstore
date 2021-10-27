using System;
using Domain.Enum;

namespace Domain
{
    public class BookAttribute
    {
        public Guid BookId { get; set; }
        public Book Book { get; set; }
        public Guid AttributeId { get; set; }
        public Attribute Attribute { get; set; }
        public double Price { get; set; }
        public double SalePrice { get; set; }
        public DateTime SalePriceStartDate { get; set; }
        public DateTime SalePriceEndDate { get; set; }
        public int TotalStock { get; set; }
        public StockStatus StockStatus { get; set; }
    }
}