using System;
using System.Collections.Generic;
using AutoMapper;
using Domain;

namespace Application.Categories
{
    [AutoMap(typeof(Category))]
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public int SubTotal { get; set; }
        public Media Media { get; set; }
        public Guid? ParentId { get; set; }
        public List<CategoryDto> SubCategories { get; set; }
    }
}