using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public Media Media { get; set; }
        public bool IsDeleted { get; set; }

        [ForeignKey("ParentCategory")]
        public Guid? ParentId { get; set; }
        public Category ParentCategory { get; set; }
        public ICollection<Category> SubCategories { get; set; } = new List<Category>();
        public ICollection<BookCategory> Books { get; set; } = new List<BookCategory>();
    }
}