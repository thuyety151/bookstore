using System.Linq;
using Application.Authors;
using Application.Books;
using Application.Books.Detail;
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
            CreateMap<Book, BookDetailDto>()
                .ForMember(x => x.Language, o => o.MapFrom(s => s.Language.Name))
                .ForMember(x => x.AuthorId, o => o.MapFrom(s => s.Author.Id))
                .ForMember(x => x.AuthorName, o => o.MapFrom(s => s.Author.Name));
            CreateMap<Item, BookDto>();
        }
        
    }
}