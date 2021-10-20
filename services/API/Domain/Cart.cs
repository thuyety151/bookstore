using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    public class Cart
    {
        public string Id { get; set; }
        public ICollection<Item> Items { get; set; }
    }
}