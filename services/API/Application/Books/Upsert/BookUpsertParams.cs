using System;
using System.Collections.Generic;
using Application.Attributes;
using Application.Authors;
using Domain;

namespace Application.Books
{
    public class BookUpsertParams
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public bool IsPublic { get; set; }
        public AuthorDto Author { get; set; }
        public Language Language { get; set; }
        public string Dimensions { get; set; }
        public DateTime PublicationDate { get; set; }
        public string Publisher { get; set; }
        public string PublicationCountry { get; set; }
        public Guid AttributeId { get; set; }
        public string Attribute { get; set; }
        public double Price { get; set; }
        public double SalePrice { get; set; }
        public DateTime SalePriceStartDate { get; set; }
        public DateTime SalePriceEndDate { get; set; }
        public int TotalStock { get; set; }
        public string StockStatus { get; set; }
        public List<CategoryDto> Categories { get; set; }
        public List<AttributeDto> Attributes { get; set; }
    }
}