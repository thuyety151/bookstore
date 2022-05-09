using System;
using Domain;
using Microsoft.AspNetCore.Authentication;

namespace Application.Authors
{
    public class AuthorDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public int Count { get; set; }
        public Media Media { get; set; }
    }
}