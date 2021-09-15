using System;

namespace Domain
{
    public class Address
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string ApartmentNumber { get; set; }
        public string Street { get; set; }
        public string Wards { get; set; }
        public string District { get; set; }
        public string CityTown { get; set; }
        public string PostCode { get; set; }
        public bool IsMain { get; set; }
    }
}