using System.Collections.Generic;
using AutoMapper;
using Domain;

namespace Application.Books
{
    [AutoMap(typeof(Book))]
    public class BookDto
    {
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double SalePrice { get; set; }
        public ICollection<Media> Media { get; set; }
        public Author Author { get; set; }
        public Attribute Attribute { get; set; }
        public Language Language { get; set; }
    }
}