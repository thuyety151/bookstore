using System;
using Domain;

namespace Application.Books
{
    public class BooksDto
    {
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double SalePrice { get; set; }
        public string PictureUrl { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; }
        public Guid LanguageId { get; set; }
        public string LanguageName { get; set; }
        public Guid AttributeId { get; set; }
        public string AttributeName { get; set; }
        
    }
}