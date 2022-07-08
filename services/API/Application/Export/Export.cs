using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Books;
using Application.Core;
using CsvHelper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Export
{
    public class Export
    {
        public class Query : IRequest<Result<File>>
        {
            
        }
        public class Handler : IRequestHandler<Query, Result<File>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<File>> Handle(Query request, CancellationToken cancellationToken)
            {
                var authors =  await _context.Authors.Where(x => x.IsDeleted == false).Select(x => new ExportDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToListAsync(cancellationToken: cancellationToken);
                
                var categories =await  _context.Categories.Where(x => x.IsDeleted == false).Select(x => new ExportDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToListAsync(cancellationToken: cancellationToken);
                
                var products = await _context.Books.Where(x => x.IsDeleted == false).Select(x => new ExportDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToListAsync(cancellationToken: cancellationToken);
                
                var languages = await _context.Languages.Select(x => new ExportDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToListAsync(cancellationToken: cancellationToken);


                var csvFiles = new List<File>()
                {
                    ToCSVFile(authors, "Authors.csv"),
                    ToCSVFile(categories, "Categories.csv"),
                    ToCSVFile(products, "Products.csv"),
                    ToCSVFile(languages, "Languages.csv"),
                };

                return Result<File>.Success(ToZip(csvFiles));
            }
            
            
            private File ToCSVFile(IEnumerable records, string fileName)
            {
                byte[] bytes;
                using (var ms = new MemoryStream())
                {
                    using (var writer = new StreamWriter(ms))
                    {
                        using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                        {
                            csv.WriteRecords(records);
                        }
                    }

                    bytes = ms.ToArray();
                }

                return new File
                {
                    Bytes = bytes,
                    FileName = fileName
                };
            }
            
            private File ToZip(List<File> files)
            {
                var compressedFileStream = new MemoryStream();
                using (var zipArchive = new ZipArchive(compressedFileStream, ZipArchiveMode.Create, true))
                {
                    foreach (var file in files)
                    {
                        var zipEntry = zipArchive.CreateEntry(file.FileName);

                        using (var originalFileStream = new MemoryStream(file.Bytes))
                        using (var zipEntryStream = zipEntry.Open())
                        {
                            originalFileStream.CopyTo(zipEntryStream);
                        }
                    }
                }

                return new File()
                {
                    Bytes = compressedFileStream.ToArray(),
                    FileName = $"Import data samples .zip"
                };
            }


        }
    }
}