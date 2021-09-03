using System;

namespace Domain
{
    public class Bill
    {
        public Guid Id { get; set; }
        public Address Address { get; set; }
        public string OrderNote { get; set; }
        
    }
}