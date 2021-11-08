using System;

namespace Domain
{
    public class ConfigQuantity
    {
        public Guid Id { get; set; }
        public string Key { get; set; }
        public int Quantity { get; set; }
        public Guid DefaultAttributeId { get; set; }
    }
}