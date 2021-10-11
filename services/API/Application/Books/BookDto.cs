using System.Collections.Generic;
using Application.Authors;
using AutoMapper;
using Domain;

namespace Application.Books
{
    public class BookDto
    {
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double SalePrice { get; set; }
        public ICollection<Media> Media { get; set; }
        public AuthorDto Author { get; set; }
        public Attribute Attribute { get; set; }
        public Language Language { get; set; }
    }
}