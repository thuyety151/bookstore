using Application.Authors;
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
        }
    }
}