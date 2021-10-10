using System.ComponentModel;
using System;
using Application.Core;
using Domain;
using System.Threading.Tasks;
using System.Collections.Generic;
using Application.Books;

namespace Application.Carts
{
    public class ItemDto
    {
        public Guid Id { get; set; }
        public double Cost { get; set; }
        public int Quantity { get; set; }
        public double Total { get; set; }
        public BookDto Book { get; set; }
    }
}