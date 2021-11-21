using System;

namespace Domain
{
    public class ConfigHomePage
    {
        public Guid Id { get; set; }
        public string Key { get; set; }
        public int Quantity { get; set; }
        public Guid DefaultAttributeId { get; set; }
        public string MetaData { get; set; }
    }
}