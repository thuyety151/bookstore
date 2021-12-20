using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Coupons;
using Domain;

namespace Application.Orders.Admin
{
    public class OrderDetailDto
    {
        public OrderTableDto Order { get; set; }
        public Address Address { get; set; }
        public ICollection<ItemDto> Items { get; set; }
    }
}