using System;
using Application.Core;

namespace Application.Books
{
    public class BookParams : PagingParams
    {
        public string CategoryId { get; set; }
        public string AuthorId { get; set; }
        public string LanguageIds { get; set; }
        public string AttributeId { get; set; }
        public double MinPrice { get; set; }
        public double MaxPrice { get; set; }
        public string Rates { get; set; }
        
    }
}