using System;
using System.Collections.Generic;
using Domain;

namespace Application.Books.Upsert
{
    public class BookUpsertParams
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public bool IsPublic { get; set; }
        public string AuthorId { get; set; }
        public string LanguageId { get; set; }
        public string Dimensions { get; set; }
        public DateTime PublicationDate { get; set; }
        public string Publisher { get; set; }
        public string PublicationCountry { get; set; }
        
        public List<CategoryDto> Categories { get; set; }
        public List<BookAttribute> Attributes { get; set; }
    }
}