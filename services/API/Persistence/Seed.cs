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
            List<Bill> bills = new List<Bill>();
            List<Cart> carts = new List<Cart>();
            List<Media> medias = new List<Media>();
            List<CartItem> cartItems = new List<CartItem>();
            List<Item> items = new List<Item>();

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
                                Street = "Duong so 8",
                                Wards = "Linh Trung",
                                District = "Thu Duc",
                                CityTown = "Ho Chi Minh",
                                PostCode = "11000",
                                IsMain = true
                            }
                        },
                        Cart= new Cart()
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
                                FirstName = "Thuyet",
                                LastName = "Y",
                                Phone = "0987654321",
                                ApartmentNumber = "11",
                                Street = "Quoc lo 1A",
                                Wards = "Linh Chieu",
                                District = "Thu Duc",
                                CityTown = "Ho Chi Minh",
                                PostCode = "11000",
                                IsMain = true
                            }
                        },
                        Cart= new Cart()
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
                                Street = "Huynh Van Luy",
                                Wards = "Phu My",
                                District = "Thu Dau Mot",
                                CityTown = "Binh Duong",
                                PostCode = "75000",
                                IsMain = true
                            }
                        },
                        Cart= new Cart()
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
                                Street = "719",
                                Wards = "Trung Lap Thuong",
                                District = "Cu Chi",
                                CityTown = "HCM",
                                PostCode = "70000",
                                IsMain = true
                              }
                        },
                        Cart= new Cart()
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
                                Street = "Huynh Van Luy",
                                Wards = "Phu My",
                                District = "Thu Dau Mot",
                                CityTown = "Binh Duong",
                                PostCode = "75000",
                                IsMain = true
                              }
                        },
                        Cart= new Cart()
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
                                Street = "719",
                                Wards = "Trung Lap Thuong",
                                District = "Cu Chi",
                                CityTown = "HCM",
                                PostCode = "70000",
                                IsMain = true
                              }
                        },
                        Cart= new Cart()
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
                        Name = "Audio Book",
                        Slug = "audio-book",
                        IsDeleted = false
                    },
                    new Attribute()
                    {
                        Id = new Guid(),
                        Name = "Hardcover",
                        Slug = "hardcover",
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
                        Name = "Paperback",
                        Slug = "paperback",
                        IsDeleted = false
                    }
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
                var books = new List<Book>()
                {
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "The Overdue Life of Amy Byler",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Harry Potter Part 4: Harry Potter And The Goblet Of Fire",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "The Alchemist ",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "The Subtle Art of Not Giving a F*Ck",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Call Me By Your Name",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Sapiens : A Brief History Of Humankind",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Homo Deus: A Brief History Of Tomorrow",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Me Before You",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Harry Potter Part 6: Harry Potter And The Half-Blood Prince",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "A Midsummer Night's Dream",
                        ShortDescription =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.",
                        Description =
                            "Planet Earth is 4.5 billion years old. In just a fraction of that time, one species among countless others has conquered it. Us.\n\nWe are the most advanced and most destructive animals ever to have lived. What makes us brilliant? What makes us deadly? What makes us Sapiens?\n\nIn this bold and provocative book, Yuval Noah Harari explores who we are, how we got here and where we’re going.\n\nSapiens is a thrilling account of humankind’s extraordinary history – from the Stone Age to the Silicon Age – and our journey from insignificant apes to rulers of the world\n\n‘It tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!’ Jared Diamond, author of Guns, Germs and Steel\n\nYuval’s follow up to Sapiens, Homo Deus, is available now.",
                        Attribute = attributes[3],
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
                        }
                    }
                };

                await context.Books.AddRangeAsync(books);
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
            // if (!context.Bills.Any())
            // {
            //     var billList = new List<Bill>()
            //     {
            //         new Bill()
            //         {
            //             Id= new Guid(),
            //             Address= context.Users.Include(x=>x.Address).Where(x=>x.Email=="thuyety15@gmail.com")
            //             .Select(x=>x.Address.FirstOrDefault()).FirstOrDefault(),
            //         }
            //     };
            //     await context.Bills.AddRangeAsync(billList);

            // }
            if (!context.Orders.Any())
            {
                var orderList = new List<Order>()
                {
                    new Order()
                    {
                        Id = new Guid(),
                        CreateDate= new DateTime(),
                        Status=(int)Status.Processing,
                        Customer=context.Users.Where(x=>x.Email=="thuyety15@gmail.com").SingleOrDefault(),
                        Bill= new Bill()
                        {
                            Id= new Guid(),
                            Address= context.Users.Include(x=>x.Address).Where(x=>x.Email=="thuyety15@gmail.com")
                            .Select(x=>x.Address.FirstOrDefault()).FirstOrDefault(),
                        },
                        PaymentMethod= (int)PaymentMethod.CashOnDelivery,
                        Items= new List<Item>()
                        {
                            new Item()
                            {
                                Id= new Guid(),
                                Book= context.Books.Where(x=>x.Name=="Harry Potter Part 4: Harry Potter And The Goblet Of Fire").SingleOrDefault(),
                                Quantity=1,
                                Cost=500000, //temp,
                                Total= 500000, // temp
                            },
                            new Item()
                            {
                                Id= new Guid(),
                                Book= context.Books.Where(x=>x.Name=="Harry Potter Part 4: Harry Potter And The Goblet Of Fire").SingleOrDefault(),
                                Quantity=1,
                                Cost=500000, //temp,
                                Total= 500000, // temp
                              }
                        },
                        SubTotal= 500000 ,//temp,
                        OrderTotal=500000,
                        ShippingFee=15000
                    }
                };
                await context.Orders.AddRangeAsync(orderList);
            }
            // if (!context.Carts.Any())
            // {
            //     var cartList = new List<Cart>()
            //     {
            //         new Cart()
            //         {
            //             Id= new Guid(),
            //             Items=context.Items.ToList(),
            //             SubTotal=0,
            //         }
            //     };
            //     await context.Carts.AddRangeAsync(cartList);
            // }
            if (!context.Media.Any())
            {
                var mediaList = new List<Media>()
                {
                    new Media()
                    {
                        Id= "LuatTamThuc",
                        Name="LuatTamThuc",
                        Url="https://firebasestorage.googleapis.com/v0/b/internship-august-2021-b1566.appspot.com/o/luat-tam-thuc.jpeg?alt=media&token=40221ba7-c0a2-48b9-b2d1-348f16e024c7",
                        IsMain=true,
                        IsVideo=false,
                    }
                };
                await context.Media.AddRangeAsync(mediaList);
            }
            // if (!context.Items.Any())    // add here to have data to add to cart
            // {
            //     var itemsList = new List<Item>()
            //     {
            //         new Item()
            //         {
            //             Id = new Guid(),
            //             Book= context.Books.Where(x=>x.Id==Guid.Parse("866245b3-c025-42a6-b7d8-08d98bb007cc")).SingleOrDefault(),
            //             Cost=1000,
            //             Quantity=10,
            //             Total=10000
            //         },
            //         new Item()
            //         {
            //             Id = new Guid(),
            //             Book= context.Books.Where(x=>x.Id==Guid.Parse("1fbeef62-281c-425f-b7d9-08d98bb007cc")).SingleOrDefault(),
            //             Cost=1000,
            //             Quantity=5,
            //             Total=10000
            //         },
            //         new Item()
            //         {
            //             Id = new Guid(),
            //             Book= context.Books.Where(x=>x.Id==Guid.Parse("45b4f077-9460-45d2-b7da-08d98bb007cc")).SingleOrDefault(),
            //             Cost=1000,
            //             Quantity=3,
            //             Total=10000
            //         },
            //     };
            //     items.AddRange(itemsList);
            //     await context.Items.AddRangeAsync(items);
            // }
            if (!context.CartItems.Any())
            {
                var cartItemList = new List<CartItem>()
                {
                    new CartItem()
                    {
                        Cart = context.Users.Where(x => x.Email == "thuyety15@gmail.com").Select(x => x.Cart).SingleOrDefault(),
                        Item =  new Item()
                        {
                            Id= new Guid(),
                            Book= context.Books.Where(x=>x.Name=="The Overdue Life of Amy Byler").SingleOrDefault(),
                            Cost=1000,
                            Quantity=12,
                            Total=12000
                        }
                    },
                    new CartItem()
                    {
                        Cart = context.Users.Where(x => x.Email == "thuyety15@gmail.com").Select(x => x.Cart).SingleOrDefault(),
                        Item =  new Item()
                        {
                            Id= new Guid(),
                            Book= context.Books.Where(x=>x.Name=="Harry Potter Part 4: Harry Potter And The Goblet Of Fire").SingleOrDefault(),
                            Cost=1000,
                            Quantity=20,
                            Total=12000
                        }
                    },
                     new CartItem()
                    {
                        Cart = context.Users.Where(x => x.Email == "thuyety15@gmail.com").Select(x => x.Cart).SingleOrDefault(),
                        Item =  new Item()
                        {
                            Id= new Guid(),
                            Book= context.Books.Where(x=>x.Name=="Harry Potter Part 6: Harry Potter And The Half-Blood Prince").SingleOrDefault(),
                            Cost=1000,
                            Quantity=10,
                            Total=12000
                        }
                    }
                };
                cartItems.AddRange(cartItemList);
                await context.CartItems.AddRangeAsync(cartItemList);
            }
            await context.SaveChangesAsync();
        }
    }
}