using System.Globalization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Domain;
using Domain.Constant;
using Domain.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Attribute = Domain.Attribute;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            List<Author> authors = new List<Author>();
            List<Attribute> attributes = new List<Attribute>();
            List<Language> languages = new List<Language>();
            List<Category> categories = new List<Category>();
            List<Coupon> coupons = new List<Coupon>();
            List<Cart> carts = new List<Cart>();
            List<Media> medias = new List<Media>();
            List<Item> items = new List<Item>();
            List<Book> books = new List<Book>();

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser()
                    {
                        UserName = "admin",
                        Email = "admin@gmail.com",
                        Role = Role.Admin,
                        Address = new List<Address>()
                        {
                            new Address()
                            {
                                Id = new Guid(),
                                FirstName = "Truong",
                                LastName = "Nguyen",
                                Phone = "0866944171",
                                ApartmentNumber = "54",
                                StreetAddress="So 8",
                                ProvinceID=202,
                                ProvinceName="Hồ Chí Minh",
                                DistrictID=3695,
                                DistrictName="Thành Phố Thủ Đức",
                                WardName="Phường Linh Chiểu",
                                IsMain = true
                            }
                        },
                    },
                    new AppUser()
                    {
                        UserName = "shop_manager",
                        Email = "shop_manager@gmail.com",
                        Role = Role.ShopManager,
                        Address = new List<Address>()
                        {
                            new Address()
                            {
                                Id = new Guid(),
                                FirstName = "Truong",
                                LastName = "Nguyen",
                                Phone = "0866944171",
                                ApartmentNumber = "54",
                                StreetAddress="So 8",
                                ProvinceID=202,
                                ProvinceName="Hồ Chí Minh",
                                DistrictID=3695,
                                DistrictName="Thành Phố Thủ Đức",
                                WardName="Phường Linh Chiểu",
                                IsMain = true
                            }
                        },
                    },
                    new AppUser()
                    {
                        UserName = "customer",
                        Email = "customer@gmail.com",
                        Role = Role.Customer,
                        Address = new List<Address>()
                        {
                            new Address()
                            {
                                Id = new Guid(),
                                FirstName = "Khung",
                                LastName = "Long",
                                Phone = "1234567890",
                                ApartmentNumber = "1179",
                                StreetAddress="So 8",
                                ProvinceID=202,
                                ProvinceName="Hồ Chí Minh",
                                DistrictID=3695,
                                DistrictName="Thành Phố Thủ Đức",
                                WardName="Phường Linh Chiểu",
                                IsMain = true
                            }
                        },
                    },
                    new AppUser()
                    {
                        UserName = "thuyety15",
                        Email = "thuyety15@gmail.com",
                        Role = Role.Customer,
                        Address = new List<Address>()
                        {
                            new Address()
                            {
                                Id = new Guid(),
                                FirstName = "Y",
                                LastName = "Nguyen",
                                Phone = "1234567890",
                                ApartmentNumber = "10",
                                 StreetAddress="So 8",
                                ProvinceID=202,
                                ProvinceName="Hồ Chí Minh",
                                DistrictID=3695,
                                DistrictName="Thành Phố Thủ Đức",
                                WardName="Phường Linh Chiểu",
                                IsMain = true
                              }
                        },
                    },
                    new AppUser()
                    {
                        UserName = "truongnguyen",
                        Email = "truongnguyen1232000@gmail.com",
                        Role = Role.Customer,
                        Address = new List<Address>()
                        {
                            new Address()
                            {
                                Id = new Guid(),
                                FirstName = "Nguyen",
                                LastName = "Truong",
                                Phone = "1234567890",
                                ApartmentNumber = "1179",
                                StreetAddress="So 8",
                                ProvinceID=202,
                                ProvinceName="Hồ Chí Minh",
                                DistrictID=3695,
                                DistrictName="Thành Phố Thủ Đức",
                                WardName="Phường Linh Chiểu",
                                IsMain = true
                              }
                        },
                    },
                    new AppUser()
                    {
                        UserName = "thuyety15",
                        Email = "thuyety15@gmail.com",
                        Role = Role.Customer,
                        Address = new List<Address>()
                        {
                            new Address()
                            {
                                Id = new Guid(),
                                FirstName = "Y",
                                LastName = "Nguyen",
                                Phone = "1234567890",
                                ApartmentNumber = "10",
                                StreetAddress="So 8",
                                ProvinceID=202,
                                ProvinceName="Hồ Chí Minh",
                                DistrictID=3695,
                                DistrictName="Thành Phố Thủ Đức",
                                WardName="Phường Linh Chiểu",
                                IsMain = true
                              }
                        },
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "KhungLongXanh@123");
                }
            }

            if (!context.Attributes.Any())
            {
                var attributesList = new List<Attribute>()
                {
                    new Attribute()
                    {
                        Id = new Guid(),
                        Name = "Paperback",
                        Slug = "paperback",
                        IsDeleted = false
                    },
                    new Attribute()
                    {
                        Id = new Guid(),
                        Name = "Kindle Books",
                        Slug = "kindle-books",
                        IsDeleted = false
                    },
                    new Attribute()
                    {
                        Id = new Guid(),
                        Name = "Hardcover",
                        Slug = "hardcover",
                        IsDeleted = false
                    },
                };
                attributes.AddRange(attributesList);
                await context.Attributes.AddRangeAsync(attributes);
            }

            if (!context.Authors.Any())
            {
                var authorList = new List<Author>()
                {
                    new Author()
                    {
                        Id = new Guid(),
                        Name = "Jay Shetty",
                        IsDeleted = false
                    },
                    new Author()
                    {
                        Id = new Guid(),
                        Name = "J. K. Rowling",
                        IsDeleted = false
                    },
                    new Author()
                    {
                        Id = new Guid(),
                        Name = "Paulo Coelho",
                        IsDeleted = false
                    },
                    new Author()
                    {
                        Id = new Guid(),
                        Name = "William Shakespeare",
                        IsDeleted = false
                    },
                    new Author()
                    {
                        Id = new Guid(),
                        Name = "Jojo Moyes",
                        IsDeleted = false
                    },
                };
                authors.AddRange(authorList);
                await context.Authors.AddRangeAsync(authors);
            }

            if (!context.Languages.Any())
            {
                var languageList = new List<Language>()
                {
                    new Language()
                    {
                        Id = new Guid(),
                        Name = "English"
                    },
                    new Language()
                    {
                        Id = new Guid(),
                        Name = "German"
                    },
                    new Language()
                    {
                        Id = new Guid(),
                        Name = "French"
                    },
                    new Language()
                    {
                        Id = new Guid(),
                        Name = "Spanish"
                    },
                    new Language()
                    {
                        Id = new Guid(),
                        Name = "Vietnamese"
                    },
                };
                languages.AddRange(languageList);
                await context.Languages.AddRangeAsync(languages);
            }

            if (!context.Media.Any())
            {
                var mediaList = new List<Media>()
                {
                    new Media()
                    {
                        Id= "The Subtle Art of Not Giving a F`*Ck",
                        Name="The Subtle Art of Not Giving a F*Ck",
                        Url="https://firebasestorage.googleapis.com/v0/b/internship-august-2021-b1566.appspot.com/o/324c1a39b6408ed0828dc2797ca7a7ba.jpg?alt=media&token=99428705-a33c-47d1-99ec-9aac2b5671a3",
                        IsMain=true,
                        IsVideo=false
                    },
                    new Media()
                    {
                        Id= "The Overdue Life of Amy Byler",
                        Name="The Overdue Life of Amy Byler",
                        Url="https://firebasestorage.googleapis.com/v0/b/internship-august-2021-b1566.appspot.com/o/The%20Overdue%20Life%20of%20Amy%20Byler.jpg?alt=media&token=c3f57044-da2c-4a64-a744-73b76c774d5e",
                        IsMain=true,
                        IsVideo=false
                    },
                    new Media()
                    {
                        Id="Harry Potter Part 4",
                        Name="Harry Potter Part 4",
                        Url="https://firebasestorage.googleapis.com/v0/b/internship-august-2021-b1566.appspot.com/o/harry_potter_and_the_goblet_of_fire_book_4_.jpg?alt=media&token=1449641d-45de-4007-8548-631024f87f36",
                        IsMain=true,
                        IsVideo=false
                    },
                    new Media()
                    {
                        Id= "The Alchemist",
                        Name="The Alchemist",
                        Url="https://firebasestorage.googleapis.com/v0/b/internship-august-2021-b1566.appspot.com/o/the-alchemist-by-paulo-coelho-bookworm-hanoi.jpg?alt=media&token=33dc7072-e3d7-4c98-9657-52c84c959f29",
                        IsMain=true,
                        IsVideo=false
                    },
                };
                medias.AddRange(mediaList);
                await context.Media.AddRangeAsync(mediaList);
            }
            if (!context.Categories.Any())
            {
                var categorieList = new List<Category>()
                {
                    new Category()
                    {
                        Id = new Guid(),
                        Name = "Arts & Photography",
                        Slug = "arts-photography",
                        IsDeleted = false,
                        SubCategories = new List<Category>()
                        {
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Architecture",
                                Slug = "architecture",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Business of Art",
                                Slug = "business-of-art",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Collections, Catalogs & Exhibitions",
                                Slug = "collections-catalogs-exhibitions",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Decorative Arts & Design",
                                Slug = "decorative-arts-design",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Drawing",
                                Slug = "drawing",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Fashion",
                                Slug = "fashion",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Graphic Design",
                                Slug = "graphic-design",
                                IsDeleted = false,
                            },
                        }
                    },
                    new Category()
                    {
                        Id = new Guid(),
                        Name = "Biographies & Memoirs",
                        Slug = "biographies-memoirs",
                        IsDeleted = false,
                        SubCategories = new List<Category>()
                        {
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Istanbul",
                                Slug = "istanbul",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Mardin",
                                Slug = "mardin",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Amed",
                                Slug = "amed",
                                IsDeleted = false,
                            },
                        }
                    },
                    new Category()
                    {
                        Id = new Guid(),
                        Name = "Children's Books",
                        Slug = "childent-books",
                        IsDeleted = false,
                        SubCategories = new List<Category>()
                        {
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Books",
                                Slug = "books",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Video Games",
                                Slug = "video-games",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Computers",
                                Slug = "computers",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Electronics",
                                Slug = "electronics",
                                IsDeleted = false,
                                SubCategories = new List<Category>()
                                {
                                    new Category()
                                    {
                                        Id = new Guid(),
                                        Name = "Camera & Photo",
                                        Slug = "camera-photo",
                                        IsDeleted = false,
                                    },
                                    new Category()
                                    {
                                        Id = new Guid(),
                                        Name = "Home Audio",
                                        Slug = "home-audio",
                                        IsDeleted = false,
                                    },
                                    new Category()
                                    {
                                        Id = new Guid(),
                                        Name = "Tv & Video",
                                        Slug = "tv-video",
                                        IsDeleted = false,
                                    },
                                    new Category()
                                    {
                                        Id = new Guid(),
                                        Name = "Car & Vehicle Electronics",
                                        Slug = "car-vehicle-electronics",
                                        IsDeleted = false,
                                    },
                                }
                            },
                        }
                    }
                };
                categories.AddRange(categorieList);
                await context.Categories.AddRangeAsync(categories);
            }
            if (!context.Books.Any())
            {
                var bookList = new List<Book>()
                {
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "The Overdue Life of Amy Byler",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[0],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category =  categories[0].SubCategories.ElementAt(0)
                            }
                        },
                        Media =medias.Where(x=>x.Name=="The Overdue Life of Amy Byler").ToList(),
                        ViewCount=1,
                        StockStatus = (int) StockStatus.InStock,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020,3,12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",

                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Harry Potter Part 4: Harry Potter And The Goblet Of Fire",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[1],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        Media =medias.Where(x=>x.Name=="Harry Potter Part 4").ToList(),
                        ViewCount=100,
                        StockStatus = (int) StockStatus.InStock,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020,3,12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "The Alchemist ",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[2],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        Media =medias.Where(x=>x.Name=="The Alchemist").ToList(),
                        ViewCount=10,
                        StockStatus = (int) StockStatus.InStock,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020,3,12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "The Subtle Art of Not Giving a F*Ck",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[3],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        Media =medias.Where(x=>x.Name=="The Subtle Art of Not Giving a F*Ck").ToList(),
                        ViewCount=11,
                        StockStatus = (int) StockStatus.InStock,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020,3,12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Call Me By Your Name",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[0],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        ViewCount=20,
                        StockStatus = (int) StockStatus.InStock,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020,3,12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Sapiens : A Brief History Of Humankind",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[0],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        ViewCount=25,
                        StockStatus = (int) StockStatus.InStock,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020,3,12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Homo Deus: A Brief History Of Tomorrow",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[0],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        ViewCount=19,
                        StockStatus = (int) StockStatus.InStock
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Me Before You",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[4],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        ViewCount=36,
                        StockStatus = (int) StockStatus.InStock,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020,3,12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Harry Potter Part 6: Harry Potter And The Half-Blood Prince",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[1],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        ViewCount=102,
                        StockStatus = (int) StockStatus.InStock,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020,3,12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "A Midsummer Night's Dream",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Author = authors[3],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        Price = 29,
                        UpdateDate = DateTime.Now,
                            Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        ViewCount=15,
                        StockStatus = (int) StockStatus.InStock,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020,3,12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
                    }
                };
                books.AddRange(bookList);
                await context.Books.AddRangeAsync(bookList);
            }

            if (!context.BookAttributes.Any())
            {
                var bookAttribute = new List<BookAttribute>()
                {
                    new BookAttribute()
                    {
                        BookId = books[0].Id,
                        AttributeId = attributes[0].Id,
                        Price = 100,
                        TotalStock = 50
                    },
                    new BookAttribute()
                    {
                        BookId = books[0].Id,
                        AttributeId = attributes[1].Id,
                        Price = 79,
                        TotalStock = 20
                    },
                    new BookAttribute()
                    {
                        BookId = books[0].Id,
                        AttributeId = attributes[2].Id,
                        Price = 120,
                        TotalStock = 6
                    },
                    new BookAttribute()
                    {
                        BookId = books[1].Id,
                        AttributeId = attributes[0].Id,
                        Price = 200,
                        TotalStock = 2
                    },
                    new BookAttribute()
                    {
                        BookId = books[1].Id,
                        AttributeId = attributes[1].Id,
                        Price = 90,
                        TotalStock = 20
                    },
                    new BookAttribute()
                    {
                        BookId = books[1].Id,
                        AttributeId = attributes[2].Id,
                        Price = 255,
                        TotalStock = 10
                    }
                };

                await context.BookAttributes.AddRangeAsync(bookAttribute);
            }
            if (!context.Reviews.Any())
            {
                var reviewList = new List<Review>()
                {
                    new Review()
                    {
                        Id = new Guid(),
                        BookId = books[0].Id,
                        Title = "Amazing Story! You will love it",
                        Content =
                            "Such an incredibly complex story! I had to buy it because there was a waiting list of 30+ at the local library for this book. Thrilled that I made the purchase",
                        Rate = 4,
                        UserId = userManager.Users.FirstOrDefault(x => x.Email == "truongnguyen1232000@gmail.com")?.Id,
                        CreateDate = DateTime.Now
                    },
                    new Review()
                    {
                        Id = new Guid(),
                        BookId = books[0].Id,
                        Title = "Get the best seller at a great price.",
                        Content = "Awesome book, great price, fast delivery. Thanks so much.",
                        Rate = 5,
                        UserId = userManager.Users.FirstOrDefault(x => x.Email == "truongnguyen1232000@gmail.com")?.Id,
                        CreateDate = DateTime.Now
                    },
                    new Review()
                    {
                        Id = new Guid(),
                        BookId = books[0].Id,
                        Title = "I read this book short...",
                        Content = "I read this book shortly after I got it and didn't just put it on my TBR shelf mainly because I saw it on Reese Witherspoon's bookclub September read. It was one of the best books I've read this year, and reminded me some of Kristen Hannah's The Great Alone.",
                        Rate = 5,
                        UserId = userManager.Users.FirstOrDefault(x => x.Email == "truongnguyen1232000@gmail.com")?.Id,
                        CreateDate = DateTime.Now
                    },
                };

                await context.Reviews.AddRangeAsync(reviewList);
            }

            if (!context.Coupons.Any())
            {
                var couponList = new List<Coupon>()
                {
                    new Coupon()
                    {
                        Id= new Guid(),
                        Code="HOT30",
                        Description="Nothing",
                        DiscountType=1,
                        IsAllowFreeShipping=false,
                        ExpireDate= DateTime.Now.AddMonths(1),
                        MinSpend=0,
                        MaxSpend=1,
                        IsIndividualOnly=false,
                        IsDeleted=false
                    },
                    new Coupon()
                    {
                        Id= new Guid(),
                        Code="HOT50",
                        Description="50K",
                        DiscountType=1,
                        IsAllowFreeShipping=false,
                        ExpireDate= DateTime.Now.AddMonths(2),
                        MinSpend=0,
                        MaxSpend=1,
                        IsIndividualOnly=false,
                        IsDeleted=false
                    },
                    new Coupon()
                    {
                        Id= new Guid(),
                        Code="30PER",
                        Description="30%",
                        DiscountType=1,
                        IsAllowFreeShipping=false,
                        ExpireDate= DateTime.Now,
                        MinSpend=0,
                        MaxSpend=1,
                        IsIndividualOnly=false,
                        IsDeleted=false
                    }
                };
                await context.Coupons.AddRangeAsync(couponList);
            }

            if (!context.Items.Any())
            {
                var itemList = new List<Item>()
                {
                    new Item()
                    {
                        Id = new Guid(),
                        ProductId = books[0].Id,
                        ProductName = books[0].Name,
                        AuthorId = books[0].Author.Id,
                        AuthorName = books[0].Author.Name,
                        PictureUrl = books[0].Media.FirstOrDefault(x => x.IsMain)?.Url,
                        Price = books[0].Attributes.ElementAt(0).Price,
                        Quantity = 2,
                        StockStatus = (int) StockStatus.InStock,
                        AttributeId = attributes[0].Id,
                        AttributeName = attributes[0].Name
                    },
                    new Item()
                    {
                        Id = new Guid(),
                        ProductId = books[1].Id,
                        ProductName = books[1].Name,
                        AuthorId = books[1].Author.Id,
                        AuthorName = books[1].Author.Name,
                        PictureUrl = books[1].Media.FirstOrDefault(x => x.IsMain)?.Url,
                        Price = books[1].Attributes.ElementAt(1).Price,
                        Quantity = 1,
                        StockStatus = (int) StockStatus.InStock,
                        AttributeId = attributes[1].Id,
                        AttributeName = attributes[1].Name
                    }
                };

                items.AddRange(itemList);
                await context.Items.AddRangeAsync(items);
            }

            if (!context.Carts.Any())
            {
                var cart = new Cart()
                {
                    Id = userManager.Users.FirstOrDefault(x => x.Email == "truongnguyen1232000@gmail.com")?.Id,
                    Items = items
                };

                await context.Carts.AddAsync(cart);
            }

            // if (!context.Orders.Any())
            // {
            //     var orderList = new List<Order>()
            //     {
            //         new Order()
            //         {
            //             Id = new Guid(),
            //             CreateDate= DateTime.Now,
            //             Status=(int)Status.Processing,
            //             Customer=context.Users.Where(x=>x.Email=="thuyety15@gmail.com").SingleOrDefault(),
            //             Bill= new Bill()
            //             {
            //                 Id= new Guid(),
            //                 Address= context.Users.Include(x=>x.Address).Where(x=>x.Email=="thuyety15@gmail.com")
            //                 .Select(x=>x.Address.FirstOrDefault()).FirstOrDefault(),
            //             },
            //             PaymentMethod= (int)PaymentMethod.CashOnDelivery,
            //             Items= new List<Item>()
            //             {
            //
            //             },
            //             SubTotal= 500000 ,//temp,
            //             OrderTotal=500000,
            //             ShippingFee=15000
            //         },
            //         new Order()
            //         {
            //             Id = new Guid(),
            //             CreateDate= DateTime.Now,
            //             Status=(int)Status.Processing,
            //             Customer=context.Users.Where(x=>x.Email=="thuyety15@gmail.com").SingleOrDefault(),
            //             Bill= new Bill()
            //             {
            //                 Id= new Guid(),
            //                 Address= context.Users.Include(x=>x.Address).Where(x=>x.Email=="thuyety15@gmail.com")
            //                 .Select(x=>x.Address.FirstOrDefault()).FirstOrDefault(),
            //             },
            //             PaymentMethod= (int)PaymentMethod.CashOnDelivery,
            //             Items= new List<Item>()
            //             {
            //
            //             },
            //             SubTotal= 500000 ,//temp,
            //             OrderTotal=500000,
            //             ShippingFee=15000
            //         },
            //         new Order()
            //         {
            //             Id = new Guid(),
            //             CreateDate= DateTime.Now,
            //             Status=(int)Status.Processing,
            //             Customer=context.Users.Where(x=>x.Email=="truongnguyen1232000@gmail.com").SingleOrDefault(),
            //             Bill= new Bill()
            //             {
            //                 Id= new Guid(),
            //                 Address= context.Users.Include(x=>x.Address).Where(x=>x.Email=="truongnguyen1232000@gmail.com")
            //                 .Select(x=>x.Address.FirstOrDefault()).FirstOrDefault(),
            //             },
            //             PaymentMethod= (int)PaymentMethod.CashOnDelivery,
            //             Items= new List<Item>()
            //             {
            //
            //             },
            //             SubTotal= 500000 ,//temp,
            //             OrderTotal=500000,
            //             ShippingFee=15000
            //         },
            //         new Order()
            //         {
            //             Id = new Guid(),
            //             CreateDate= DateTime.Now,
            //             Status=(int)Status.Processing,
            //             Customer=context.Users.Where(x=>x.Email=="customer@gmail.com").SingleOrDefault(),
            //             Bill= new Bill()
            //             {
            //                 Id= new Guid(),
            //                 Address= context.Users.Include(x=>x.Address).Where(x=>x.Email=="customer@gmail.com")
            //                 .Select(x=>x.Address.FirstOrDefault()).FirstOrDefault(),
            //             },
            //             PaymentMethod= (int)PaymentMethod.CashOnDelivery,
            //             Items= new List<Item>()
            //             {
            //
            //             },
            //             SubTotal= 500000 ,//temp,
            //             OrderTotal=500000,
            //             ShippingFee=15000
            //         }
            //     };
            //     await context.Orders.AddRangeAsync(orderList);
            // }
            if (!context.ConfigQuantities.Any())
            {
                var configs = new List<ConfigQuantity>()
                {
                    new ConfigQuantity()
                    {
                        Id= new Guid(),
                        Key=ConfigQuantityName.BestSelling.ToString(),
                        Quantity=10,
                    },
                    new ConfigQuantity()
                    {
                        Id= new Guid(),
                        Key=ConfigQuantityName.DealsOfWeek.ToString(),
                        Quantity=10
                    },
                    new ConfigQuantity()
                    {
                        Id= new Guid(),
                        Key=ConfigQuantityName.BiographyBook.ToString(),
                        Quantity=10,
                        DefaultAttributeId = attributes[2].Id
                    },
                    new ConfigQuantity()
                    {
                        Id= new Guid(),
                        Key=ConfigQuantityName.MostView.ToString(),
                        Quantity=10
                    },
                    new ConfigQuantity()
                    {
                        Id= new Guid(),
                        Key=ConfigQuantityName.OnSale.ToString(),
                        Quantity=10
                    },
                    new ConfigQuantity()
                    {
                        Id= new Guid(),
                        Key=ConfigQuantityName.NewRelease.ToString(),
                        Quantity=10
                    },
                    new ConfigQuantity()
                    {
                        Id= new Guid(),
                        Key=ConfigQuantityName.TopCategory.ToString(),
                        Quantity=10
                    },
                    new ConfigQuantity()
                    {
                        Id= new Guid(),
                        Key=ConfigQuantityName.Highlight.ToString(),
                        Quantity=10
                    },
                    new ConfigQuantity()
                    {
                        Id= new Guid(),
                        Key=ConfigQuantityName.BestOfWeek.ToString(),
                        Quantity=10
                    }
                };
                await context.ConfigQuantities.AddRangeAsync(configs);
            }
            await context.SaveChangesAsync();
        }
    }
}