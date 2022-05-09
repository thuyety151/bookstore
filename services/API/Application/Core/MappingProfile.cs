using System;
using System.Linq;
using Application.Attributes;
using Application.Authors;
using Application.Books;
using Application.Books.Detail;
using Application.Categories;
using Application.Coupons;
using Application.Orders;
using Application.Orders.Admin;
using Application.Report;
using Application.Review;
using AutoMapper;
using Domain;
using Domain.Enum;
using CategoryDto = Application.Categories.CategoryDto;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Author, AuthorDto>()
                .ForMember(x => x.ImageUrl, o => o.MapFrom(s => s.Media.Url))
                .ForMember(x => x.Count, o => o.MapFrom(s => s.Books.Count));
            CreateMap<Category, CategoryDto>();
            CreateMap<Domain.Review, ReviewDto>();
            CreateMap<Category, BooksCategoriesDto>();
            CreateMap<Book, BooksCategoriesDto>();
            CreateMap<Book, BookDetailDto>()
                .ForMember(x => x.CategoryIds, o => o.MapFrom(c => c.Categories.Select(x => x.CategoryId.ToString()).ToList()))
                .ForMember(x => x.LanguageId, o => o.MapFrom(l => l.Language.Id))
                .ForMember(x => x.IsPublic, o => o.MapFrom(x => x.IsPublic))
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
            CreateMap<Book, BooksDto>();
            CreateMap<Order, OrderDto>()
                .ForMember(x=>x.PaymentMethod,o=>o.MapFrom(x=>(PaymentMethod)x.PaymentMethod));
            CreateMap<BookAttribute, BooksDto>()
                .ForMember(x => x.AttributeName, o => o.MapFrom(x => x.Attribute.Name))
                .ForMember(x => x.AuthorId, o => o.MapFrom(x => x.Book.Author.Id))
                .ForMember(x => x.AuthorName, o => o.MapFrom(x => x.Book.Author.Name))
                .ForMember(x => x.Name, o => o.MapFrom(x => x.Book.Name))
                .ForMember(x => x.LanguageId, o => o.MapFrom(x => x.Book.Language.Id))
                .ForMember(x => x.LanguageName, o => o.MapFrom(x => x.Book.Language.Name))
                .ForMember(x => x.PictureUrl, o => o.MapFrom(x => x.Book.Media.FirstOrDefault(m => m.IsMain).Url))
                .ForMember(x => x.StockStatus, o => o.MapFrom(x => x.StockStatus.ToString()))
                .ForMember(x => x.Categories,
                    o => o.MapFrom(x => String.Join(",", x.Book.Categories.Select(c => c.Category.Name))))
                .ForMember(x => x.PublishDate, o => o.MapFrom(x => x.Book.PublicationDate))
                .ForMember(x => x.Id, o => o.MapFrom(x => x.Book.Id))
                .ForMember(x => x.Price, o => o.MapFrom(x => x.Price))
                .ForMember(x => x.SalePrice, o => o.MapFrom(x => x.SalePrice))
                .ForMember(x => x.StockStatus, o => o.MapFrom(x => x.StockStatus))
                .ForMember(x => x.TotalStock, o => o.MapFrom(x => x.TotalStock));
                
            CreateMap<Item, ItemDto>();
            
        }
    }
    

}