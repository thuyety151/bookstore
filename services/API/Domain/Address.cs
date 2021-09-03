using System;

namespace Domain
{
    public class Address
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Country { get; set; }
        public string StreetAddress { get; set; }
        public string CityTown { get; set; }
        public string PostCode { get; set; }
        public bool IsMain { get; set; }
    }
}