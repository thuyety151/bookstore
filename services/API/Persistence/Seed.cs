using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Constant;
using Domain.Enum;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
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
            // List<Coupon> coupons = new List<Coupon>();
            // List<Cart> carts = new List<Cart>();
            List<Media> medias = new List<Media>();
            List<Item> items = new List<Item>();
            List<Book> books = new List<Book>();
            
             if (!context.Media.Any())
            {
                var mediaList = new List<Media>()
                {
                    new Media()
                    {
                        Id = "The Overdue Life of Amy Byler",
                        Name = "The Overdue Life of Amy Byler",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638283159/91Fu3IZ94dL_zovqpr.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "Harry-Potter",
                        Name = "Harry Potter Part 4: Harry Potter And The Goblet Of Fire",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638280759/b94e8848ea41470c767f0266604975c4_ogeezy.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "The Alchemist",
                        Name = "The Alchemist",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638283152/18144590._UY2404_SS2404__qfego2.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "The Subtle Art of Not Giving a F*Ck",
                        Name = "The Subtle Art of Not Giving a F*Ck",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638281086/324c1a39b6408ed0828dc2797ca7a7ba_ufu97l.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "Call Me By Your Name",
                        Name = "Call Me By Your Name",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1637631893/xaf8lnujl3awvje051wc.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "Sapiens : A Brief History Of Humankind",
                        Name = "Sapiens : A Brief History Of Humankind",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1637631571/gvrrv7brlw1n7p5ja7wy.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "Homo Deus: A Brief History Of Tomorrow",
                        Name = "Homo Deus: A Brief History Of Tomorrow",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638268740/azsw2cuvwqkkkpswveeg.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "Me Before You",
                        Name = "Me Before You",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638282596/81COeJEEL7L_rcmocb.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "Harry Potter Part 6: Harry Potter And The Half-Blood Prince",
                        Name = "Harry Potter Part 6: Harry Potter And The Half-Blood Prince",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638001547/tyidcqekzkiwbel8rrp8.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "A Midsummer Night's Dream",
                        Name = "A Midsummer Night's Dream",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1637991420/soflh6ojpomhqytdqxlv.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "kkb7aekv76n5vy2wlkcz",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1637609555/kkb7aekv76n5vy2wlkcz.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "smdgpxjjz794tsyrwh60",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1637609533/smdgpxjjz794tsyrwh60.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "ifnsdeuqmtssobetb1we",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1637609504/ifnsdeuqmtssobetb1we.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "ppouorllrmfrhsohussm",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1637609346/ppouorllrmfrhsohussm.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "b8818d43b66cbef4217b8389028298da",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638281868/b8818d43b66cbef4217b8389028298da_squsjh.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "Atomic-habit",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638282045/2021_10_25_16_04_02_1-390x510_rqdhpn.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "Search-inside-yourself",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638255851/mgweajs2bd9zoaczczyx.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "violent",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638269078/djezmsg9evmxbrmmqqnt.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "the-greate-catsby",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1637991420/soflh6ojpomhqytdqxlv.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "mlwiruyyxllf1zk1kn9l",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638454280/mlwiruyyxllf1zk1kn9l.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "aleglevp9dj4mgzonrkv",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638454745/aleglevp9dj4mgzonrkv.webp",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "qstxf4703gudtpaxvqyb",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638454860/qstxf4703gudtpaxvqyb.png",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "jojo",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1638281868/b8818d43b66cbef4217b8389028298da_squsjh.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "oepi4mkbliqduvoqoipi",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1639902996/oepi4mkbliqduvoqoipi.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "rjmpwbgiwjs6saxkfemj",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1639903058/rjmpwbgiwjs6saxkfemj.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "uyribzc8lso7rcj6r5nh",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1639903093/uyribzc8lso7rcj6r5nh.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "rjdkiptrevsucu8yatpz",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1639903159/rjdkiptrevsucu8yatpz.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "xt0hoc9ovnywdqcfwvtm",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1639903291/xt0hoc9ovnywdqcfwvtm.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "1000_F_291676005_IcSCl53QbU3ufMXkcueU5hHpCd9HL2mT_gdlx9d",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1653385134/1000_F_291676005_IcSCl53QbU3ufMXkcueU5hHpCd9HL2mT_gdlx9d.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "1000_F_291676143_GtsMEfoFeRQADmmeLg7MSiOxYE1ET9hZ_hcuwqt",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1653385219/1000_F_291676143_GtsMEfoFeRQADmmeLg7MSiOxYE1ET9hZ_hcuwqt.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "1000_F_291676484_c75u4ZW3kkGUOpoPLA8z5KheyhRlidNA_rcg5ah",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1653385222/1000_F_291676484_c75u4ZW3kkGUOpoPLA8z5KheyhRlidNA_rcg5ah.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "1000_F_305138551_NlXQ4mYosD5N0rSPqKWIWmq8lsgQIs7V_idzccw",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1653385222/1000_F_305138551_NlXQ4mYosD5N0rSPqKWIWmq8lsgQIs7V_idzccw.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "1000_F_291678347_ldV3Fs2UXsVMe1fpkoTcluIjNh65z6ya_xdfec3",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1653385222/1000_F_291678347_ldV3Fs2UXsVMe1fpkoTcluIjNh65z6ya_xdfec3.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    new Media()
                    {
                        Id = "ufdrmng19mxrrpcl6jwv",
                        Url = "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1654259352/ufdrmng19mxrrpcl6jwv.jpg",
                        IsMain = true,
                        IsVideo = false
                    },
                    
                };
                medias.AddRange(mediaList);
                await context.Media.AddRangeAsync(mediaList);
            }


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
                                StreetAddress = "So 8",
                                ProvinceId = 202,
                                ProvinceName = "Hồ Chí Minh",
                                DistrictId = 3695,
                                DistrictName = "Thành Phố Thủ Đức",
                                WardName = "Phường Linh Chiểu",
                                IsMain = true
                            }
                        },
                        Photo = medias.FirstOrDefault(x => x.Id == "ufdrmng19mxrrpcl6jwv")
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
                                StreetAddress = "So 8",
                                ProvinceId = 202,
                                ProvinceName = "Hồ Chí Minh",
                                DistrictId = 3695,
                                DistrictName = "Thành Phố Thủ Đức",
                                WardName = "Phường Linh Chiểu",
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
                                Phone = "0866933178",
                                ApartmentNumber = "1179",
                                StreetAddress = "So 8",
                                ProvinceId = 202,
                                ProvinceName = "Hồ Chí Minh",
                                DistrictId = 3695,
                                DistrictName = "Thành Phố Thủ Đức",
                                WardName = "Phường Linh Chiểu",
                                IsMain = true
                            }
                        },
                        Photo = medias.FirstOrDefault(x => x.Id == "ufdrmng19mxrrpcl6jwv")
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
                                Phone = "0866933176",
                                ApartmentNumber = "10",
                                StreetAddress = "So 8",
                                ProvinceId = 202,
                                ProvinceName = "Hồ Chí Minh",
                                DistrictId = 3695,
                                DistrictName = "Thành Phố Thủ Đức",
                                WardName = "Phường Linh Chiểu",
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
                                Phone = "0866933179",
                                ApartmentNumber = "1179",
                                StreetAddress = "So 8",
                                ProvinceId = 202,
                                ProvinceName = "Hồ Chí Minh",
                                DistrictId = 3695,
                                DistrictName = "Thành Phố Thủ Đức",
                                WardName = "Phường Linh Chiểu",
                                IsMain = true
                            }
                        },
                        
                    },
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
                    new Attribute()
                    {
                        Id = new Guid(),
                        Name = "Audible Audiobook",
                        Slug = "audible-audiobook",
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
                        IsDeleted = false,
                        Media = medias.FirstOrDefault(x => x.Id == "ppouorllrmfrhsohussm")

                    },
                    new Author()
                    {
                        Id = new Guid(),
                        Name = "J. K. Rowling",
                        IsDeleted = false,
                        Media = medias.FirstOrDefault(x => x.Id == "ifnsdeuqmtssobetb1we")
                    },
                    new Author()
                    {
                        Id = new Guid(),
                        Name = "Paulo Coelho",
                        IsDeleted = false,
                        Media = medias.FirstOrDefault(x => x.Id == "smdgpxjjz794tsyrwh60")
                    },
                    new Author()
                    {
                        Id = new Guid(),
                        Name = "William Shakespeare",
                        IsDeleted = false,
                        Media = medias.FirstOrDefault(x => x.Id == "kkb7aekv76n5vy2wlkcz")
                    },
                    new Author()
                    {
                        Id = new Guid(),
                        Name = "Jojo Moyes",
                        IsDeleted = false,
                        Media = medias.FirstOrDefault(x => x.Id == "jojo")
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
                        Name = "Business, Finance & Management",
                        Slug = "business-finance-management",
                        IsDeleted = false,
                        SubCategories = new List<Category>()
                        {
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Business & Management",
                                Slug = "business-management",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Economics",
                                Slug = "economics",
                                IsDeleted = false,
                            }
                        },
                        Media = medias.Where(x => x.Id == "qstxf4703gudtpaxvqyb").SingleOrDefault()
                    },
                    new Category()
                    {
                        Id = new Guid(),
                        Name = "Personal Development",
                        Slug = "personal-development",
                        IsDeleted = false,
                        SubCategories = new List<Category>()
                        {
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Popular Psychology",
                                Slug = "popular-psychology",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Personal Finance",
                                Slug = "personal-finance",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Self Sufficiency",
                                Slug = "self-sufficiency",
                                IsDeleted = false,
                            },
                        },
                        Media = medias.Where(x => x.Id == "aleglevp9dj4mgzonrkv").SingleOrDefault()
                    },
                    new Category()
                    {
                        Id = new Guid(),
                        Name = "Fiction",
                        Slug = "fiction",
                        IsDeleted = false,
                        SubCategories = new List<Category>()
                        {
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Romance",
                                Slug = "romance",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Science Fiction",
                                Slug = "science-fiction",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Adventure",
                                Slug = "adventure",
                                IsDeleted = false,
                            }
                        },
                        Media = medias.Where((x => x.Id == "mlwiruyyxllf1zk1kn9l")).SingleOrDefault()
                    },
                    new Category()
                    {
                        Id = new Guid(),
                        Name = "Comics & Graphic Novels",
                        Slug = "comics-and-graphic-novels",
                        IsDeleted = false,
                        SubCategories = new List<Category>()
                        {
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Manga",
                                Slug = "manga",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Superheroes",
                                Slug = "superheroes",
                                IsDeleted = false,
                            },
                            new Category()
                            {
                                Id = new Guid(),
                                Name = "Fantasy Graphic Novels",
                                Slug = "fantasy-graphic-novels",
                                IsDeleted = false,
                            }
                        },
                        Media = medias.Where((x => x.Id == "xt0hoc9ovnywdqcfwvtm")).SingleOrDefault()
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(0)
                            }
                        },
                        Media = medias.Where(x => x.Id == "The Overdue Life of Amy Byler").ToList(),
                        ViewCount = 1,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[2]
                            }
                        },
                        Media = medias.Where(x => x.Id == "Harry-Potter").ToList(),
                        ViewCount = 100,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        Media = medias.Where(x => x.Id == "The Alchemist").ToList(),
                        ViewCount = 10,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[1].SubCategories.ElementAt(0)
                            }
                        },
                        Media = medias.Where(x => x.Id == "The Subtle Art of Not Giving a F*Ck").ToList(),
                        ViewCount = 11,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[1].SubCategories.ElementAt(1)
                            }
                        },
                        Media = medias.Where(x => x.Id == "Call Me By Your Name").ToList(),
                        ViewCount = 20,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[1].SubCategories.ElementAt(1)
                            }
                        },
                        Media = medias.Where(x => x.Id == "Sapiens : A Brief History Of Humankind").ToList(),
                        ViewCount = 25,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[1].SubCategories.ElementAt(2)
                            }
                        },
                        Media = medias.Where(x => x.Id == "Homo Deus: A Brief History Of Tomorrow").ToList(),
                        ViewCount = 19,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        Media = medias.Where(x => x.Id == "Me Before You").ToList(),
                        ViewCount = 36,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[2]
                            }
                        },
                        Media = medias.Where(x => x.Id == "Harry Potter Part 6: Harry Potter And The Half-Blood Prince")
                            .ToList(),
                        ViewCount = 102,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
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
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        Media = medias.Where(x => x.Id == "A Midsummer Night's Dream").ToList(),
                        ViewCount = 15,
                        Dimensions = "9126 x 194 x 28mm | 301g",
                        PublicationDate = new DateTime(2020, 3, 12),
                        Publisher = "Little, Brown Book Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Atomic Habits",
                        ShortDescription =
                            "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
                        Description =
                            "The instant New York Times bestseller. \nTiny Changes, Remarkable Results. \nNo matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results./nIf you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.\nClear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.",
                        Author = authors[0],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(1)
                            }
                        },
                        Media = medias.Where(x => x.Id == "Atomic-habit").ToList(),
                        ViewCount = 150,
                        Dimensions = "15.7 x 2.7 x 18.3 cm",
                        PublicationDate = new DateTime(2020, 3, 12),
                        Publisher = "Avery Publishing Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "The Greate Catsby",
                        ShortDescription =
                            "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
                        Description =
                            "The instant New York Times bestseller. \nTiny Changes, Remarkable Results. \nNo matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results./nIf you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.\nClear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.",
                        Author = authors[3],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[1].SubCategories.ElementAt(0)
                            }
                        },
                        Media = medias.Where(x => x.Id == "the-greate-catsby").ToList(),
                        ViewCount = 150,
                        Dimensions = "15.7 x 2.7 x 18.3 cm",
                        PublicationDate = new DateTime(2020, 3, 12),
                        Publisher = "Avery Publishing Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Search Inside Yourself: Achieving Success",
                        ShortDescription =
                            "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
                        Description =
                            "The instant New York Times bestseller. \nTiny Changes, Remarkable Results. \nNo matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results./nIf you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.\nClear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.",
                        Author = authors[4],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[2].SubCategories.ElementAt(0)
                            }
                        },
                        Media = medias.Where(x => x.Id == "Search-inside-yourself").ToList(),
                        ViewCount = 150,
                        Dimensions = "15.7 x 2.7 x 18.3 cm",
                        PublicationDate = new DateTime(2020, 3, 12),
                        Publisher = "Avery Publishing Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Violet Bent Backwards Over The Grass",
                        ShortDescription =
                            "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
                        Description =
                            "The instant New York Times bestseller. \nTiny Changes, Remarkable Results. \nNo matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results./nIf you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.\nClear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.",
                        Author = authors[4],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[2].SubCategories.ElementAt(2)
                            }
                        },
                        Media = medias.Where(x => x.Id == "violent").ToList(),
                        ViewCount = 150,
                        Dimensions = "15.7 x 2.7 x 18.3 cm",
                        PublicationDate = new DateTime(2020, 3, 12),
                        Publisher = "Avery Publishing Group",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Loki: Agent of Asgard - The Complete Collection",
                        ShortDescription = "As Asgardia’s one-man secret service, Loki is ready to lie, cheat and steal his way through the most treacherous missions the All-Mother can throw at " +
                                           "him – starting with a heart-stopping heist at Avengers Tower! Loki takes on Lorelei in Monte Carlo’s casinos, heads to the ancient past on a quest for a " +
                                           "magical sword and puts together a crew to crack the deepest dungeons of Asgardia itself! Plus: Axis pits him against the brutish Thor, god of evil! But " +
                                           "who is King Loki? What vile scheme has he been brewing all this time? And what does this shadowy king’s very existence mean for our Loki?",
                        Description =
                            "The instant New York Times bestseller. \nTiny Changes, Remarkable Results. \nNo matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results./nIf you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.\nClear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.",
                        Author = authors[4],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[3].SubCategories.ElementAt(0)
                            }
                        },
                        Media = medias.Where(x => x.Id == "rjmpwbgiwjs6saxkfemj").ToList(),
                        ViewCount = 150,
                        Dimensions = "6.6 x 1.15 x 10.15 inches",
                        PublicationDate = new DateTime(2020, 3, 12),
                        Publisher = "Marvel",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "Thinking, Fast and Slow",
                        ShortDescription = "In his mega bestseller, Thinking, Fast and Slow, Daniel Kahneman, world-famous psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.",
                        Description = "System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. The impact of overconfidence on corporate strategies, the difficulties of predicting what will make us happy in the future, the profound effect of cognitive biases on everything from playing the stock market to planning our next vacation?each of these can be understood only by knowing how the two systems shape our judgments and decisions. " +
                                      "Engaging the reader in a lively conversation about how we think, Kahneman reveals where we can and cannot trust our intuitions and how we can tap into the benefits of slow thinking. He offers practical and enlightening insights into how choices are made in both our business and our personal lives?and how we can use different techniques to guard against the mental glitches that often get us into trouble. Topping bestseller lists for almost ten years, Thinking, Fast and Slow is a contemporary classic, an essential book that has changed the lives of millions of readers.",
                        Author = authors[4],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(0)
                            }
                        },
                        Media = medias.Where(x => x.Id == "rjdkiptrevsucu8yatpz").ToList(),
                        ViewCount = 150,
                        Dimensions = "5.51 x 1.46 x 8.23 inches",
                        PublicationDate = new DateTime(2013, 4, 1),
                        Publisher = "Farrar, Straus and Giroux",
                        PublicationCountry = "London, United Kingdom",
                    },
                    new Book()
                    {
                        Id = new Guid(),
                        Name = "The High 5 Habit: Take Control of Your Life with One Simple Habit",
                        ShortDescription = "In her global phenomenon The 5 Second Rule, Mel Robbins taught millions of people around the world the five second secret to motivation. Now she's back with another simple, proven tool you can use to take control of your life: The High 5 Habit.",
                        Description = "The High 5 Habit is a simple yet profound tool that changes your attitude, your mindset, and your behavior. So be prepared to laugh and learn as you take steps to immediately boost your confidence, happiness, and results.",
                            Author = authors[4],
                        CreateDate = DateTime.Now,
                        IsDeleted = false,
                        IsPublic = true,
                        Language = languages[0],
                        UpdateDate = DateTime.Now,
                        Categories = new List<BookCategory>()
                        {
                            new BookCategory()
                            {
                                Category = categories[0].SubCategories.ElementAt(0)
                            }
                        },
                        Media = medias.Where(x => x.Id == "uyribzc8lso7rcj6r5nh").ToList(),
                        ViewCount = 150,
                        Dimensions = "6.25 x 0.9 x 9.26 inches",
                        PublicationDate = new DateTime(2021, 9, 28),
                        Publisher = "Hay House Inc",
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
                        Price = 14.95,
                        TotalStock = 50,
                        StockStatus = StockStatus.InStock,
                        SalePrice = 7.49,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                    },
                    new BookAttribute()
                    {
                        BookId = books[0].Id,
                        AttributeId = attributes[1].Id,
                        Price = 4.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[0].Id,
                    //     AttributeId = attributes[2].Id,
                    //     Price = 6.99,
                    //     TotalStock = 6,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[0].Id,
                        AttributeId = attributes[3].Id,
                        Price = 24.99,
                        SalePrice = 20,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                    },
                    new BookAttribute()
                    {
                        BookId = books[1].Id,
                        AttributeId = attributes[0].Id,
                        Price = 12.99,
                        SalePrice = 6.92,
                        TotalStock = 2,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                    },
                    new BookAttribute()
                    {
                        BookId = books[1].Id,
                        AttributeId = attributes[1].Id,
                        Price = 9.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[1].Id,
                    //     AttributeId = attributes[2].Id,
                    //     Price = 44.99,
                    //     TotalStock = 10,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[1].Id,
                        AttributeId = attributes[3].Id,
                        Price = 44.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock
                    },
                    new BookAttribute()
                    {
                        BookId = books[2].Id,
                        AttributeId = attributes[0].Id,
                        Price = 23.95,
                        TotalStock = 2,
                        StockStatus = StockStatus.InStock
                    },
                    new BookAttribute()
                    {
                        BookId = books[2].Id,
                        AttributeId = attributes[1].Id,
                        Price = 16.99,
                        SalePrice = 11.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[2].Id,
                    //     AttributeId = attributes[2].Id,
                    //     Price = 255,
                    //     TotalStock = 10,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[2].Id,
                        AttributeId = attributes[3].Id,
                        Price = 23.95,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[3].Id,
                    //     AttributeId = attributes[0].Id,
                    //     Price = 200,
                    //     TotalStock = 2,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[3].Id,
                        AttributeId = attributes[1].Id,
                        Price = 12.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[3].Id,
                    //     AttributeId = attributes[2].Id,
                    //     Price = 23.95,
                    //     TotalStock = 10,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[3].Id,
                        AttributeId = attributes[3].Id,
                        Price = 23.95,
                        TotalStock = 10,
                        StockStatus = StockStatus.InStock
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[4].Id,
                    //     AttributeId = attributes[0].Id,
                    //     Price = 22.99,
                    //     TotalStock = 2,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[4].Id,
                        AttributeId = attributes[1].Id,
                        Price = 10.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[4].Id,
                    //     AttributeId = attributes[2].Id,
                    //     Price = 10.99,
                    //     TotalStock = 10,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[4].Id,
                        AttributeId = attributes[3].Id,
                        Price = 27.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[5].Id,
                    //     AttributeId = attributes[0].Id,
                    //     Price = 27.99,
                    //     TotalStock = 2,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[5].Id,
                        AttributeId = attributes[1].Id,
                        Price = 37.50,
                        SalePrice = 14.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[5].Id,
                    //     AttributeId = attributes[2].Id,
                    //     Price = 34.22,
                    //     TotalStock = 10,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[5].Id,
                        AttributeId = attributes[3].Id,
                        Price = 34.22,
                        TotalStock = 10,
                        StockStatus = StockStatus.InStock
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[6].Id,
                    //     AttributeId = attributes[0].Id,
                    //     Price = 32.99,
                    //     TotalStock = 2,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[6].Id,
                        AttributeId = attributes[1].Id,
                        Price = 24.99,
                        SalePrice = 14.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                    },
                    // new BookAttribute()
                    // {
                    //     BookId = books[6].Id,
                    //     AttributeId = attributes[2].Id,
                    //     Price = 34.22,
                    //     TotalStock = 10,
                    //     StockStatus = StockStatus.InStock
                    // },
                    new BookAttribute()
                    {
                        BookId = books[6].Id,
                        AttributeId = attributes[3].Id,
                        Price = 34.22,
                        TotalStock = 10,
                        StockStatus = StockStatus.InStock
                    },
                    new BookAttribute()
                    {
                        BookId = books[7].Id,
                        AttributeId = attributes[0].Id,
                        Price = 18,
                        TotalStock = 2,
                        StockStatus = StockStatus.InStock
                    },
                    new BookAttribute()
                    {
                        BookId = books[7].Id,
                        AttributeId = attributes[1].Id,
                        Price = 16,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock
                    },
                    new BookAttribute()
                    {
                        BookId = books[7].Id,
                        AttributeId = attributes[2].Id,
                        Price = 33.60,
                        TotalStock = 10,
                        StockStatus = StockStatus.InStock
                    },
                    new BookAttribute()
                    {
                        BookId = books[8].Id,
                        AttributeId = attributes[0].Id,
                        Price = 12.99,
                        SalePrice = 10,
                        TotalStock = 2,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                    },
                    new BookAttribute()
                    {
                        BookId = books[8].Id,
                        AttributeId = attributes[1].Id,
                        Price = 9.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock
                    },
                    new BookAttribute()
                    {
                        BookId = books[8].Id,
                        AttributeId = attributes[2].Id,
                        Price = 255,
                        TotalStock = 10,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 200
                    },
                    new BookAttribute()
                    {
                        BookId = books[8].Id,
                        AttributeId = attributes[3].Id,
                        Price = 44.99,
                        TotalStock = 10,
                        StockStatus = StockStatus.InStock,
                    },
                    new BookAttribute()
                    {
                        BookId = books[9].Id,
                        AttributeId = attributes[0].Id,
                        Price = 20,
                        TotalStock = 2,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 15
                    },
                    new BookAttribute()
                    {
                        BookId = books[9].Id,
                        AttributeId = attributes[1].Id,
                        Price = 9,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 4.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[9].Id,
                        AttributeId = attributes[2].Id,
                        Price = 25.5,
                        TotalStock = 10,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 21.5
                    },
                    new BookAttribute()
                    {
                        BookId = books[10].Id,
                        AttributeId = attributes[0].Id,
                        Price = 35.5,
                        TotalStock = 2,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 30
                    },
                    new BookAttribute()
                    {
                        BookId = books[10].Id,
                        AttributeId = attributes[1].Id,
                        Price = 9,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 5
                    },
                    new BookAttribute()
                    {
                        BookId = books[10].Id,
                        AttributeId = attributes[2].Id,
                        Price = 15.5,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 9.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[11].Id,
                        AttributeId = attributes[0].Id,
                        Price = 23.4,
                        TotalStock = 2,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 19.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[11].Id,
                        AttributeId = attributes[1].Id,
                        Price = 11.9,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 9.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[11].Id,
                        AttributeId = attributes[2].Id,
                        Price = 15.0,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 9.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[12].Id,
                        AttributeId = attributes[0].Id,
                        Price = 23.4,
                        TotalStock = 2,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 19.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[12].Id,
                        AttributeId = attributes[1].Id,
                        Price = 11.9,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 9.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[12].Id,
                        AttributeId = attributes[2].Id,
                        Price = 15.0,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now,
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 9.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[13].Id,
                        AttributeId = attributes[0].Id,
                        Price = 23.4,
                        TotalStock = 2,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now.AddDays(2),
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 19.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[13].Id,
                        AttributeId = attributes[1].Id,
                        Price = 11.9,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now.AddDays(2),
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 9.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[13].Id,
                        AttributeId = attributes[2].Id,
                        Price = 15.0,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now.AddDays(2),
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 9.9
                    },
                    new BookAttribute()
                    {
                        BookId = books[14].Id,
                        AttributeId = attributes[0].Id,
                        Price = 35.99,
                        TotalStock = 50,
                        StockStatus = StockStatus.InStock,
                        SalePriceStartDate = DateTime.Now.AddDays(2),
                        SalePriceEndDate = DateTime.Now.AddDays(100),
                        SalePrice = 26.35
                    },
                    new BookAttribute()
                    {
                        BookId = books[14].Id,
                        AttributeId = attributes[1].Id,
                        Price = 14.9,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                    },
                     new BookAttribute()
                    {
                        BookId = books[15].Id,
                        AttributeId = attributes[0].Id,
                        Price = 11.29,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                    },
                     new BookAttribute()
                    {
                        BookId = books[15].Id,
                        AttributeId = attributes[1].Id,
                        Price = 9.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                    },
                     new BookAttribute()
                    {
                        BookId = books[15].Id,
                        AttributeId = attributes[2].Id,
                        Price = 21.9,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                    },
                      new BookAttribute()
                    {
                        BookId = books[16].Id,
                        AttributeId = attributes[0].Id,
                        Price = 16.69,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                    },
                     new BookAttribute()
                    {
                        BookId = books[16].Id,
                        AttributeId = attributes[1].Id,
                        Price = 12.99,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                    },
                     new BookAttribute()
                    {
                        BookId = books[16].Id,
                        AttributeId = attributes[2].Id,
                        Price = 15.79,
                        TotalStock = 20,
                        StockStatus = StockStatus.InStock,
                    },
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
                        Content =
                            "I read this book shortly after I got it and didn't just put it on my TBR shelf mainly because I saw it on Reese Witherspoon's bookclub September read. It was one of the best books I've read this year, and reminded me some of Kristen Hannah's The Great Alone.",
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
                        Id = new Guid(),
                        Code = "CASHB",
                        Description = "CASH BACK - 50% OFF",
                        DiscountType = (int) DiscountType.Percentage,
                        ExpireDate = DateTime.Now.AddMonths(2),
                        MinSpend = 10,
                        IsDeleted = false,
                        CouponAmount = 50,
                        Media = medias.FirstOrDefault(x => x.Id == "1000_F_291676005_IcSCl53QbU3ufMXkcueU5hHpCd9HL2mT_gdlx9d")
                    },
                    new Coupon()
                    {
                        Id = new Guid(),
                        Code = "GROPEN",
                        Description = "GRAND OPEN - 50$ OFF",
                        DiscountType = (int) DiscountType.FixedCart,
                        ExpireDate = DateTime.Now.AddMonths(2),
                        MinSpend = 10,
                        IsDeleted = false,
                        CouponAmount = 50,
                        Media = medias.FirstOrDefault(x => x.Id == "1000_F_291676143_GtsMEfoFeRQADmmeLg7MSiOxYE1ET9hZ_hcuwqt")
                    },
                    new Coupon()
                    {
                        Id = new Guid(),
                        Code = "SNOW20",
                        Description = "WINTER SALE - 20$ OFF",
                        DiscountType = (int) DiscountType.FixedCart,
                        ExpireDate = DateTime.Now,
                        MinSpend = 5,
                        IsDeleted = false,
                        CouponAmount = 20,
                        Media = medias.FirstOrDefault(x => x.Id == "1000_F_291678347_ldV3Fs2UXsVMe1fpkoTcluIjNh65z6ya_xdfec3")
                    },
                    new Coupon()
                    {
                        Id = new Guid(),
                        Code = "BLACKF",
                        Description = "BLACK FRIDAY - 30% OFF",
                        DiscountType = (int) DiscountType.Percentage,
                        ExpireDate = DateTime.Now,
                        MinSpend = 5,
                        IsDeleted = false,
                        CouponAmount = 30,
                        Media = medias.FirstOrDefault(x => x.Id == "1000_F_291676484_c75u4ZW3kkGUOpoPLA8z5KheyhRlidNA_rcg5ah")
                    },
                    new Coupon()
                    {
                        Id = new Guid(),
                        Code = "NEWY20",
                        Description = "HAPPY NEW YEAR - 20% OFF",
                        DiscountType = (int) DiscountType.Percentage,
                        ExpireDate = DateTime.Now,
                        MinSpend = 5,
                        IsDeleted = false,
                        CouponAmount = 20,
                        Media = medias.FirstOrDefault(x => x.Id == "1000_F_305138551_NlXQ4mYosD5N0rSPqKWIWmq8lsgQIs7V_idzccw")
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
                        StockStatus = StockStatus.InStock.ToString(),
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
                        StockStatus = StockStatus.InStock.ToString(),
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
            if (!context.ConfigHomePages.Any())
            {
                var configs = new List<ConfigHomePage>()
                {
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.BestSelling.ToString(),
                        Quantity = 10,
                        DefaultAttributeId = attributes[0].Id
                    },
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.DealsOfWeek.ToString(),
                        Quantity = 10,
                        DefaultAttributeId = attributes[0].Id
                    },
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.BiographyBook.ToString(),
                        Quantity = 10,
                        DefaultAttributeId = attributes[0].Id
                    },
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.MostView.ToString(),
                        Quantity = 10,
                        DefaultAttributeId = attributes[0].Id
                    },
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.OnSale.ToString(),
                        Quantity = 10,
                        DefaultAttributeId = attributes[0].Id
                    },
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.NewRelease.ToString(),
                        Quantity = 10,
                        DefaultAttributeId = attributes[0].Id,
                        MetaData = JsonConvert.SerializeObject(categories.Take(4).Select(x => x.Id).ToList())
                    },
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.TopCategory.ToString(),
                        Quantity = 10,
                    },
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.Highlight.ToString(),
                        Quantity = 10,
                        DefaultAttributeId = attributes[0].Id
                    },
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.BestOfWeek.ToString(),
                        Quantity = 10,
                        DefaultAttributeId = attributes[0].Id
                    },
                    new ConfigHomePage()
                    {
                        Id = new Guid(),
                        Key = ConfigQuantityName.TopAuthor.ToString(),
                        Quantity = 10,
                    }
                };
                await context.ConfigHomePages.AddRangeAsync(configs);
            }

            if (!context.OrderStatus.Any())
            {
                var orderStatuses = new List<OrderStatus>()
                {
                    new OrderStatus()
                    {
                        Key = "ready_to_pick",
                        Name = "Ready to pick"
                    },
                    new OrderStatus()
                    {
                        Key = "picking",
                        Name = "Picking"
                    },
                    new OrderStatus()
                    {
                        Key = "cancel",
                        Name = "Cancel"
                    },
                    new OrderStatus()
                    {
                        Key = "money_collect_picking",
                        Name = "Money collect picking"
                    },
                    new OrderStatus()
                    {
                        Key = "picked",
                        Name = "Picked"
                    },
                    new OrderStatus()
                    {
                        Key = "storing",
                        Name = "Storing"
                    },
                    new OrderStatus()
                    {
                        Key = "transporting",
                        Name = "Transporting"
                    },
                    new OrderStatus()
                    {
                        Key = "sorting",
                        Name = "Sorting"
                    },
                    new OrderStatus()
                    {
                        Key = "delivering",
                        Name = "Delivering"
                    },
                    new OrderStatus()
                    {
                        Key = "money_collect_delivering",
                        Name = "Money collect delivering"
                    },
                    new OrderStatus()
                    {
                        Key = "delivered",
                        Name = "Delivered"
                    },
                    new OrderStatus()
                    {
                        Key = "delivery_fail",
                        Name = "Delivery fail"
                    },
                    new OrderStatus()
                    {
                        Key = "waiting_to_return",
                        Name = "Waiting to return"
                    },
                    new OrderStatus()
                    {
                        Key = "return",
                        Name = "Return"
                    },
                    new OrderStatus()
                    {
                        Key = "return_transporting",
                        Name = "Return transporting"
                    },
                    new OrderStatus()
                    {
                        Key = "return_sorting",
                        Name = "Return sorting"
                    },
                    new OrderStatus()
                    {
                        Key = "returning",
                        Name = "Returning"
                    },
                    new OrderStatus()
                    {
                        Key = "return_fail",
                        Name = "Return fail"
                    },
                    new OrderStatus()
                    {
                        Key = "returned",
                        Name = "Returned"
                    },
                    new OrderStatus()
                    {
                        Key = "exception",
                        Name = "Exception"
                    },
                    new OrderStatus()
                    {
                        Key = "damage",
                        Name = "Damage"
                    },
                    new OrderStatus()
                    {
                        Key = "lost",
                        Name = "Lost"
                    },
                };

                await context.OrderStatus.AddRangeAsync(orderStatuses);
            }

            await context.SaveChangesAsync();
        }
    }
}