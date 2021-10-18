using System.Collections.Generic;
using System;
using Domain;

namespace Application.Books
{
    public class BooksCategoriesDto
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public ICollection<BookDto> Books { get; set; }
    }
}