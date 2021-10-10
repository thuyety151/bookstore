using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public bool IsPublic { get; set; }
        public double Price { get; set; }
        public double SalePrice { get; set; }
        public DateTime SalePriceStartDate { get; set; }
        public DateTime SalePriceEndDate { get; set; }
        public int StockStatus { get; set; }
        public int TotalStock { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsDeleted { get; set; }
        public int ViewCount { get; set; }
        public ICollection<BookCategory> Categories { get; set; }
        public ICollection<Media> Media { get; set; }
        public ICollection<BookCoupon> Coupons { get; set; }
        public Author Author { get; set; }
        public Attribute Attribute { get; set; }
        public Language Language { get; set; }


    }
}