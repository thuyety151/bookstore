using System;
using System.Collections.Generic;

namespace Application.Categories
{
    public class CategoryDtosBooksForSale
    {
        public Guid Value { get; set; }
        public string Label { get; set; }
        public ICollection<CategoryDtosBooksForSale> Children { get; set; } = new List<CategoryDtosBooksForSale>();
    }
}