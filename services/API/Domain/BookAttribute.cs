using System;

namespace Domain
{
    public class BookAttribute
    {
        public Guid BookId { get; set; }
        public Book Book { get; set; }
        public Guid AttributeId { get; set; }
        public Attribute Attribute { get; set; }
        public double Price { get; set; }
        public int TotalStock { get; set; }
    }
}