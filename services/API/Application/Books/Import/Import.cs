#nullable enable
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection.Metadata;
using System.Runtime.Intrinsics.X86;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using Domain;
using ExcelDataReader;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Books.Import
{
    public class Import
    {
        public class Command : IRequest<Result<Media>>
        {
            public IFormFile? File { get; set; }
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
                // var mediaUploadResult = await _mediaAccessor.AddMedia(request.File);

                var excel = new Media()
                {
                    Id = DateTime.Now.Ticks.ToString(),
                    Name = request.File!.FileName,
                    // Url = mediaUploadResult.Url,
                    Url="",
                    IsExcel = true,
                    CreatedAt = DateTime.Now
                };
                const string mesage = "";
                try
                {
                    await using Stream stream = request.File.OpenReadStream();
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
                        if (item!.ItemArray[0].ToString() == "")
                        {
                            break;
                        }
                        var imgUrls = item.ItemArray[7].ToString()!.Split(",").ToList();

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
                        var book = new Book();
                        if (item.ItemArray[1].ToString() != "")
                        {
                            book = _context.Books.Include(x=>x.Attributes).Include(x=>x.Categories).FirstOrDefault(x => x.Id.ToString() == item.ItemArray[1].ToString());
                            if (book == null)
                            {
                                throw new InvalidOperationException("Book does not exist");
                            }
                            book.Attributes.Clear();
                            book.Categories.Clear(); 
                        }
                        else
                        {
                            book.Id = new Guid();
                        }
                        string? generalError = CheckGeneralInfo(item,row.IndexOf(item));
                        if (generalError!=null)
                        {
                            return Result<Media>.Failure(generalError.ToString());
                        }
                            
                        // create new
                        book.Name = item.ItemArray[2].ToString();
                        book.Description = item.ItemArray[3].ToString();
                        book.ShortDescription = item.ItemArray[4].ToString();
                        book.Language = await _context.Languages.FindAsync(Guid.Parse(item.ItemArray[5].ToString()!));
                        if (book.Language == null)
                        {
                            throw new InvalidOperationException("Language doesnt exist");
                        }
                        book.Categories = new List<BookCategory>();
                        book.Attributes = new List<BookAttribute>();
                        book.Media = _context.Media.Where(x => listMedia.Select(m => m.Id).Contains(x.Id)).ToList();
                        book.IsPublic = (bool) item.ItemArray[8] || item.ItemArray[8].ToString()!.ToLower() == "true";
                        book.Dimensions = item.ItemArray[27].ToString();
                        book.Publisher = item.ItemArray[28].ToString();
                        book.PublicationCountry = item.ItemArray[29].ToString();
                        book.PublicationDate = DateTime.Parse(item.ItemArray[30].ToString()!);
                        book.CreateDate = DateTime.Now;
                        book.UpdateDate = DateTime.Now;
                        var categoryIds = item.ItemArray[6].ToString()!.Split(",").Select(x => x.Trim()).ToList();
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
                            string? errorMsg= CheckAttribute(item, 9, row.IndexOf(item));
                            if (errorMsg != null)
                            {
                                throw new InvalidOperationException(errorMsg);
                            }
                            // ADD PAPERBACK
                            book.Attributes.Add(new BookAttribute()
                            {
                                BookId = book.Id,
                                AttributeId = _context.Attributes.FirstOrDefault(x => x.Name.Contains("Paperback"))!.Id,
                                Price = Double.Parse(item.ItemArray[10].ToString() ?? string.Empty),
                                SalePrice = Double.Parse(item.ItemArray[11].ToString() ?? "0"),
                                TotalStock = Int32.Parse(item.ItemArray[12].ToString() ?? "0"),
                                SalePriceStartDate = DateTime.Parse(item.ItemArray[13].ToString() ?? string.Empty),
                                SalePriceEndDate = DateTime.Parse(item.ItemArray[14].ToString() ?? string.Empty),
                            });
                        }
                        if (item.ItemArray[15].ToString() != "")
                        {
                            string? errorMsg= CheckAttribute(item, 15, row.IndexOf(item));
                            if (errorMsg != null)
                            {
                                throw new InvalidOperationException(errorMsg);
                            }
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
                        if (item.ItemArray[21].ToString() != "")
                        {
                            string? errorMsg= CheckAttribute(item, 21, row.IndexOf(item));
                            if (errorMsg != null)
                            {
                                throw new InvalidOperationException(errorMsg);
                            }
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
                        if (item.ItemArray[1].ToString() == "")
                        {
                            listBookToAdd.Add(book);
                        }
                        else
                        {
                            await _context.SaveChangesAsync(cancellationToken);

                        }
                    }
                    await _context.AddRangeAsync(listBookToAdd, cancellationToken);
                    await _context.SaveChangesAsync(cancellationToken);
                    excel.IsSuccess = true;
                }
                catch(Exception e)
                {
                    excel.IsSuccess = false;
                    return Result<Media>.Failure(e.Message);
                }
                finally
                {
                    _context.Media.Add(excel);
                }
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                    return Result<Media>.Success(excel);

                return Result<Media>.Failure(mesage);
            }
        }

        private static String? CheckGeneralInfo(DataRow item,int rowIndex )
        {
            // Is Public is not null
            // return item.ItemArray[8] != null;
            if (item.ItemArray[8] == null)
            {
                return "Got error at column 7 row "+ rowIndex;
            }
            if (DateTime.TryParse(item.ItemArray[30].ToString(),out DateTime Temp)==false)
            {
                return "Got error at column 7 row "+ rowIndex;
            }
            // Required
            int[] requiredIndex = { 2, 3, 4, 5, 6, 7, };

            foreach (var index in requiredIndex)
            {
                if (item.ItemArray[index].ToString() == "")
                {
                    return "Got error at column "+index+" row "+ rowIndex;
                }
            }
            
            return null;
        }
        private static String? CheckAttribute(DataRow item,int indexStart,int rowIndex)
        {
            for (int i = 0; i < 6; i++)
            {
                try
                {
                    switch (i)
                    {
                        case 1:
                        case 2:
                            double.Parse(item.ItemArray[i + indexStart].ToString()!);

                            break;
                        case 3:
                            int.Parse(item.ItemArray[i + indexStart].ToString()!);
                            break;
                        case 4:
                        case 5:
                            DateTime.Parse(item.ItemArray[i + indexStart].ToString()!);
                            break;
                    }
                } catch
                {
                    return "Got error at column " + $"{i+indexStart}" + " row " + rowIndex;
                }
            }
            return null;
        }
    }
}