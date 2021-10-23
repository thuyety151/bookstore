using System;

namespace Domain
{
    public class DeliveryMethod
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string DeliveryTime { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public bool IsDeleted { get; set; }
    }
}