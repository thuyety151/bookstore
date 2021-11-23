using System;
using System.Collections.Generic;

namespace Application.Categories
{
    public class CategoryDtosBooksForSale
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<CategoryDtosBooksForSale> SubCategories { get; set; } = new List<CategoryDtosBooksForSale>();
    }
}