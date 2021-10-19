using Application.Authors;
using Application.Books;
using Application.Carts;
using Application.Categories;
using Application.Review;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Author, AuthorDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Domain.Review, ReviewDto>();
            CreateMap<Book, BookDto>();
            CreateMap<Category, BooksCategoriesDto>();
            CreateMap<Book, BooksCategoriesDto>();
        }
    }
}