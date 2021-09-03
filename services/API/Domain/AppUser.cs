using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{ 
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Media Photo { get; set; }
        public ICollection<Address> Address { get; set; }

        public string Role { get; set; }
    }
}