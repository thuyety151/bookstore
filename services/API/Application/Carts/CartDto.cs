using System.ComponentModel;
using System;
using Application.Core;
using Domain;
using System.Threading.Tasks;
using System.Collections.Generic;
using Application.Books;

namespace Application.Carts
{
    public class CartDto
    {
        public Guid Id { get; set; }
        public double SubTotal { get; set; }
        public ICollection<ItemDto> Items { get; set; }
    }
}