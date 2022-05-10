using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using Domain;
using ExcelDataReader;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
namespace Application.Books.Import
{
    public class Import
    {
        public class Command : IRequest<Result<Media>>
        {
            public IFormFile File { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Media>>
        {
            private readonly DataContext _context;
            private readonly IMediaAccessor _mediaAccessor;

            public Handler(DataContext context, IMediaAccessor mediaAccessor)
            {
                _context = context;
                _mediaAccessor = mediaAccessor;

            }
            public async Task<Result<Media>> Handle(Command request, CancellationToken cancellationToken)
            {
                // upload file
                var mediaUploadResult = await _mediaAccessor.AddMedia(request.File);

                var excel = new Media()
                {
                    Id = DateTime.Now.Ticks.ToString(),
                    Name = request.File.FileName,
                    Url = mediaUploadResult.Url,
                    IsExcel = true,
                    CreatedAt = DateTime.Now
                };
                try
                {
                    await using (Stream stream = request.File.OpenReadStream())
                    {
                        var excelDataReader = ExcelDataReader.ExcelReaderFactory.CreateReader(stream);

                        var conf = new ExcelDataSetConfiguration()
                        {
                            ConfigureDataTable = a => new ExcelDataTableConfiguration
                            {
                                UseHeaderRow = true,
                                ReadHeaderRow = (reader) =>
                                {
                                    // Skip the first two rows, use the third row as header:
                                    reader.Read();
                                    reader.Read();
                                    reader.Read();
                                }
                            }
                        };

                        DataSet dataSet = excelDataReader.AsDataSet(conf);
                        DataRowCollection row = dataSet.Tables["Import Template"].Rows;
                        var listBookToAdd = new List<Book>();
                        foreach (DataRow item in row)
                        {
                            if (item.ItemArray[0].ToString() == "")
                            {
                                break;
                            }
                            var imgUrls = item.ItemArray[7].ToString().Split(",").ToList();
                            if (item.ItemArray[1].ToString() != "") continue;

                            // create medias
                            var listMedia = imgUrls.Select(url => new Media()
                                {
                                    Id = DateTime.Now.Ticks.ToString(),
                                    Url = url,
                                    IsMain = url == imgUrls[0]
                                })
                                .ToList();
                            await _context.Media.AddRangeAsync(listMedia, cancellationToken);
                            await _context.SaveChangesAsync(cancellationToken);

                            Console.WriteLine(item.ItemArray[8]);
                            Console.WriteLine(item.ItemArray[8].ToString());
                            // create new
                            var book = new Book()
                            {
                                Id = new Guid(),
                                Name = item.ItemArray[2].ToString(),
                                Description = item.ItemArray[3].ToString(),
                                ShortDescription = item.ItemArray[4].ToString(),
                                Language = await _context.Languages.FindAsync(Guid.Parse(item.ItemArray[5].ToString())),
                                Categories = new List<BookCategory>(),
                                Attributes = new List<BookAttribute>(),
                                Media = _context.Media.Where(x => listMedia.Select(m => m.Id).Contains(x.Id)).ToList(),
                                IsPublic = (bool) item.ItemArray[8] || item.ItemArray[8].ToString().ToLower() == "true",
                                Dimensions = item.ItemArray[27].ToString(),
                                Publisher = item.ItemArray[28].ToString(),
                                PublicationCountry = item.ItemArray[29].ToString(),
                                PublicationDate = DateTime.Parse(item.ItemArray[30].ToString()!),
                                CreateDate = DateTime.Now,
                                UpdateDate = DateTime.Now
                            };
                            var categoryIds = item.ItemArray[6].ToString().Split(",").Select(x => x.Trim()).ToList();
                            Console.WriteLine(categoryIds);
                            var categories =
                                _context.Categories.Where(x => categoryIds.Contains(x.Id.ToString()));
                            foreach (var category in categories)
                            {
                                var bookCategory = new BookCategory()
                                {
                                    Category = category
                                };
                                book.Categories.Add(bookCategory);
                            }
                            // Add attributes
                            if (item.ItemArray[9].ToString() != "")
                            {
                                try
                                {
                                    // ADD PAPERBACK
                                    book.Attributes.Add(new BookAttribute()
                                    {
                                        Attribute = _context.Attributes.FirstOrDefault(x => x.Name.Contains("Paperback")),
                                        Price = Double.Parse(item.ItemArray[10].ToString() ?? string.Empty),
                                        SalePrice = Double.Parse(item.ItemArray[11].ToString() ?? string.Empty),
                                        TotalStock = Int32.Parse(item.ItemArray[12].ToString() ?? string.Empty),
                                        SalePriceStartDate = DateTime.Parse(item.ItemArray[13].ToString() ?? string.Empty),
                                        SalePriceEndDate = DateTime.Parse(item.ItemArray[14].ToString() ?? string.Empty),
                                    });
                                }
                                catch
                                {
                                    // ignored
                                }

                            }
                            try
                            {
                                // ADD KINDLEBOOK
                                book.Attributes.Add(new BookAttribute()
                                {
                                    BookId = book.Id,
                                    Attribute = _context.Attributes.FirstOrDefault(x => x.Name.Contains("Kindle")),
                                    Price = Double.Parse(item.ItemArray[16].ToString() ?? string.Empty),
                                    SalePrice = Double.Parse(item.ItemArray[17].ToString() ?? string.Empty),
                                    TotalStock = Int32.Parse(item.ItemArray[18].ToString() ?? string.Empty),
                                    SalePriceStartDate = DateTime.Parse(item.ItemArray[19].ToString() ?? string.Empty),
                                    SalePriceEndDate = DateTime.Parse(item.ItemArray[20].ToString() ?? string.Empty),
                                });
                            }
                            catch
                            {
                                // ignore
                            }
                            try
                            {
                                // ADD HARDCOVER
                                book.Attributes.Add(new BookAttribute()
                                {
                                    BookId = book.Id,
                                    Attribute = _context.Attributes.FirstOrDefault(x => x.Name.Contains("Hardcover")),
                                    Price = Double.Parse(item.ItemArray[22].ToString() ?? string.Empty),
                                    SalePrice = Double.Parse(item.ItemArray[23].ToString() ?? string.Empty),
                                    TotalStock = Int32.Parse(item.ItemArray[24].ToString() ?? string.Empty),
                                    SalePriceStartDate = DateTime.Parse(item.ItemArray[25].ToString() ?? string.Empty),
                                    SalePriceEndDate = DateTime.Parse(item.ItemArray[26].ToString() ?? string.Empty),
                                });
                            }
                            catch
                            {
                                // ignore
                            }
                            listBookToAdd.Add(book);

                        }
                        await _context.AddRangeAsync(listBookToAdd, cancellationToken);
                        await _context.SaveChangesAsync(cancellationToken);
                        excel.IsSuccess = true;
                    }
                }
                catch
                {
                    excel.IsSuccess = false;
                }
                finally
                {
                    _context.Media.Add(excel);
                }
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                    return Result<Media>.Success(excel);

                return Result<Media>.Failure("Error when import data!");
            }
        }
    }
}