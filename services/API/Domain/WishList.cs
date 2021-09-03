using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    public class WishList
    {
        public Guid Id { get; set; }
        public ICollection<Item> Items { get; set; }
        public AppUser User { get; set; }
    }
}