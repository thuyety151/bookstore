using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories.Admin
{
    public class GetAll
    {
        public class Query : IRequest<Result<PagedList<CategoryDto>>>
        {
            public PagingParams Params { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<PagedList<CategoryDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<PagedList<CategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categoryDtos = _context.Categories
                    .Include(x => x.Media)
                    .Include(x => x.Books)
                    .Where(x => x.IsDeleted == false)
                    .OrderByDescending(x => x.CreateDate)
                    .Select(x => new CategoryDto()
                    {
                        Id = x.Id,
                        Name = x.ParentId == null ? x.Name : "-" + x.Name,
                        Description = x.Description,
                        Slug = x.Slug,
                        MediaUrl = x.Media.Url,
                        Media=x.Media,
                        Count = x.Books.Count,
                        ParentId = x.ParentId
                    }).AsQueryable();

                return Result<PagedList<CategoryDto>>.Success(
                    await PagedList<CategoryDto>.CreatePage(categoryDtos, request.Params.PageIndex,
                        request.Params.PageSize));
            }
        }
    }
}