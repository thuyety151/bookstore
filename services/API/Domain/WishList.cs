using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class WishList
    {
        public Guid Id { get; set; }
        public ICollection<Item> Items { get; set; }
    }
}