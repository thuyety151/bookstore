using System;

namespace Domain
{
    public class Item
    {
        public Guid Id { get; set; }
        public double Cost { get; set; }
        public int Quantity { get; set; }
        public double Total { get; set; }
        public Book Book { get; set; }
        
    }
}