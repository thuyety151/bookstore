using System;
using System.Collections.Generic;
using Domain;

namespace Application.Books.Detail
{
    public class BookDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double SalePrice { get; set; }
        public int ViewCount { get; set; }
        public ICollection<Media> Media { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; }
        public ICollection<BookAttributeDto> Attributes { get; set; }
        public string Language { get; set; }
        public string Dimensions { get; set; }
        public DateTime PublicationDate { get; set; }
        public string Publisher { get; set; }
        public string PublicationCountry { get; set; }
        public string StockStatus { get; set; }
        public int TotalStock { get; set; }
        
    }
}