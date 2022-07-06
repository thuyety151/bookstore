using System;
using System.Collections.Generic;
using Application.Books;
using Application.Books.Detail;
using Domain;
using Microsoft.AspNetCore.Authentication;

namespace Application.Authors
{
    public class AuthorDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int Count { get; set; }
        public string Description { get; set; }
        public List<BooksDto> Books { get; set; }
    }
}