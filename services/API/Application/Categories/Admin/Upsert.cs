using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories.Admin
{
    public class Upsert
    {
        public class Command : IRequest<Result<Guid>>
        {
            public CategoryParams CategoryParams { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Guid>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Add
                if (request.CategoryParams.Id == Guid.Empty)
                {
                    var category = new Category()
                    {
                        Id = new Guid(),
                        Name = request.CategoryParams.Name,
                        Slug = request.CategoryParams.Slug,
                        Description = request.CategoryParams.Description
                    };
                    
                    //Set photo
                    if (!string.IsNullOrWhiteSpace(request.CategoryParams.MediaId))
                    {
                        var media = _context.Media.FirstOrDefault(x => x.Id == request.CategoryParams.MediaId);
                        if (media != null)
                        {
                            media.IsMain = true;
                            media.Name = category.Name;
                            media.IsVideo = false;

                            category.Media = media;
                        }
                    }
                    //Add to parent cateogry
                    if (request.CategoryParams.ParentId != Guid.Empty)
                    {
                        var parentCategory =
                            _context.Categories.FirstOrDefault(x => x.Id == request.CategoryParams.ParentId);
                        if (parentCategory == null)
                        {
                            return Result<Guid>.Failure("Error when add category: Parent id does not exist");
                        }

                        category.ParentId = parentCategory.Id;
                    }

                    await _context.Categories.AddAsync(category);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (result) return Result<Guid>.Success(category.Id);

                    return Result<Guid>.Failure("Error when add category");
                    
                }
                else
                {
                    var category = _context.Categories.Include(x => x.Media).FirstOrDefault(x =>
                        x.Id == request.CategoryParams.Id && x.IsDeleted == false);

                    if (category == null)
                    {
                        return Result<Guid>.Failure("Category does not exist");
                    }

                    category.Name = request.CategoryParams.Name;
                    category.Slug = request.CategoryParams.Slug;
                    
                    if (!string.IsNullOrWhiteSpace(request.CategoryParams.Description))
                    {
                        category.Description = request.CategoryParams.Description;
                    }
                    
                    if (!string.IsNullOrWhiteSpace(request.CategoryParams.MediaId) && category.Media.Id != request.CategoryParams.MediaId)
                    {
                        var media = _context.Media.FirstOrDefault(x => x.Id == request.CategoryParams.MediaId);
                        if (media != null)
                        {
                            media.IsMain = true;
                            media.Name = category.Name;
                            media.IsVideo = false;

                            category.Media = media;
                        }
                    }
                    
                    //Add to parent cateogry
                    if (request.CategoryParams.ParentId != Guid.Empty && category.ParentId != request.CategoryParams.ParentId)
                    {
                        var parentCategory =
                            _context.Categories.FirstOrDefault(x => x.Id == request.CategoryParams.ParentId);
                        if (parentCategory == null)
                        {
                            return Result<Guid>.Failure("Error when add category: Parent id does not exist");
                        }

                        category.ParentId = parentCategory.Id;
                    }
                   
                    await _context.SaveChangesAsync(); 
                    
                    return Result<Guid>.Success(category.Id);
                }
            }
        }
    }
}