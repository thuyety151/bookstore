using System.Linq;
using Application.Attributes;
using Application.Authors;
using Application.Books;
using Application.Books.Detail;
using Application.Categories;
using Application.Coupons;
using Application.Orders;
using Application.Review;
using AutoMapper;
using Domain;
using Domain.Enum;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Author, AuthorDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Domain.Review, ReviewDto>();
            CreateMap<Category, BooksCategoriesDto>();
            CreateMap<Book, BooksCategoriesDto>();
            CreateMap<Book, BookDetailDto>()
                .ForMember(x => x.Language, o => o.MapFrom(s => s.Language.Name))
                .ForMember(x => x.AuthorId, o => o.MapFrom(s => s.Author.Id))
                .ForMember(x => x.AuthorName, o => o.MapFrom(s => s.Author.Name))
                .ForMember(x => x.Price,
                    o => o.MapFrom(x => x.Attributes.FirstOrDefault(x => x.Attribute.Name == "Paperback").Price));

            CreateMap<BookAttribute, BookAttributeDto>()
                .ForMember(x => x.Id, o => o.MapFrom(x => x.AttributeId))
                .ForMember(x => x.Name, o => o.MapFrom(x => x.Attribute.Name));
            CreateMap<Domain.Attribute, AttributeDto>();
            CreateMap<Domain.Coupon, CouponDto>()
                .ForMember(x => x.DiscountType, o => o.MapFrom(x => (DiscountType) x.DiscountType));
            CreateMap<Item, ItemWithoutId>();
            CreateMap<Book, BooksDto>();
        }
    }
}