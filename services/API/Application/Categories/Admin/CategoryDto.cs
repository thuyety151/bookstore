using System;
using Domain;

namespace Application.Categories.Admin
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string MediaUrl { get; set; }
        public Media Media { get; set; }
        public int Count { get; set; }
        public Guid? ParentId { get; set; }
    }
}