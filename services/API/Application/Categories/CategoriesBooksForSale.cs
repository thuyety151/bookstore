using System.Collections.Generic;
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
        public class Query : IRequest<Result<List<CategoryDtosBooksForSale>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<CategoryDtosBooksForSale>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<List<CategoryDtosBooksForSale>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categoriesCategoryDtosBooksForSales = await _context.Categories.Include(x => x.SubCategories)
                    .Where(x => x.IsDeleted == false && x.ParentCategory == null)
                    .Select(x => new CategoryDtosBooksForSale()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        SubCategories = x.SubCategories.Select(s => new CategoryDtosBooksForSale()
                        {
                            Id = s.Id,
                            Name = s.Name
                        }).ToList()
                    }).ToListAsync();

                return Result<List<CategoryDtosBooksForSale>>.Success(categoriesCategoryDtosBooksForSales);
            }
        }
    }
}