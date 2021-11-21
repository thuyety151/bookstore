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
        public string StreetAddress { get; set; }
        public int DistrictId { get; set; }
        public int ProvinceId { get; set; }
        public string WardName { get; set; }
        public string WardCode { get; set; }
        public string DistrictName { get; set; }
        public string ProvinceName { get; set; }
        public bool IsMain { get; set; }
    }
}