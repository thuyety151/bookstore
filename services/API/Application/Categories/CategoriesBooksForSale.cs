using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class CategoriesBooksForSale
    {
        public class Query : IRequest<Result<PagedList<CategoryDtosBooksForSale>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<CategoryDtosBooksForSale>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<PagedList<CategoryDtosBooksForSale>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categoriesCategoryDtosBooksForSales = _context.Categories.Include(x => x.SubCategories)
                    .Where(x => x.IsDeleted == false)
                    .Select(x => new CategoryDtosBooksForSale()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        SubCategories = x.SubCategories.Select(s => new CategoryDtosBooksForSale()
                        {
                            Id = s.Id,
                            Name = s.Name
                        }).ToList()
                    });

                return Result<PagedList<CategoryDtosBooksForSale>>.Success(
                    await PagedList<CategoryDtosBooksForSale>.CreatePage(categoriesCategoryDtosBooksForSales,
                        request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}