using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    public class Coupon
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int DiscountType { get; set; }
        public bool IsAllowFreeShipping { get; set; }
        public DateTime ExpireDate { get; set; }
        public double MinSpend { get; set; }
        public double MaxSpend { get; set; }
        public bool IsIndividualOnly { get; set; }

        public ICollection<Book> Books { get; set; }
        public ICollection<Book> ExcludeBooks { get; set; }
        public ICollection<Category> Categories { get; set; }
        public ICollection<Category> ExcludeCategories { get; set; }
    }
}