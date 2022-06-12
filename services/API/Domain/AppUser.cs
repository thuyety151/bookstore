using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Media Photo { get; set; }
        public bool IsDeleted { get; set; }
        public string Role { get; set; }
        public ICollection<Address> Address { get; set; }
        public ICollection<UserCoupon> Coupons { get; set; }
        public ICollection<UserNoti> Notis { get; set; }
    }
}