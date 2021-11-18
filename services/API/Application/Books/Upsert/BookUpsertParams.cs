using System;
using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Http;

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
        public string MainMediaId { get; set; }
        public List<string> CategoryIds { get; set; }
        public List<BookAttribute> Attributes { get; set; }
        
    }
}