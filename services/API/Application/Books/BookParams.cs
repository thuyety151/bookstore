using System;
using Application.Core;

namespace Application.Books
{
    public class BookParams : PagingParams
    {
        public string CategoryIds { get; set; }
        public string AuthorIds { get; set; }
        public string LanguageIds { get; set; }
        public string AttributeIds { get; set; }
        public double MinPrice { get; set; }
        public double MaxPrice { get; set; }
        public string Rates { get; set; }
        
        public string Predicate { get; set; }
        public string Keywords { get; set; }
        
    }
}