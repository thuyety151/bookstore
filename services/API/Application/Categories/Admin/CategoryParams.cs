using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Domain;

namespace Application.Categories.Admin
{
    public class CategoryParams
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string MediaId { get; set; }
        public Guid? ParentId { get; set; }
    }
}