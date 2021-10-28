using System;

namespace Application.Addresses
{
    public class AddressParams
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string ApartmentNumber { get; set; }
        public string StreetAddress { get; set; }
        public int DistrictID { get; set; }
        public int ProvinceID { get; set; }
        public string WardName { get; set; }
        public string DistrictName { get; set; }
        public string ProvinceName { get; set; }
        public bool IsMain { get; set; }
    }
}