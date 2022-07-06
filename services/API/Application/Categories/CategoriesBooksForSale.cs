using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            public async Task<Result<List<CategoryDtosBooksForSale>>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Category> parents = _context.Categories.Include(x => x.ParentCategory).ToList();

                TreeExtensions.ITree<Category> virtualRootNode =
                    parents.ToTree((parent, child) => child.ParentId == parent.Id);

                List<TreeExtensions.ITree<Category>> parentCategoriesWithSubCategories =
                    virtualRootNode.Children.ToList();
                // List<TreeExtensions.ITree<Category>> flattenedCategories =
                //     virtualRootNode.Children.Flatten(node => node.Children).ToList();
                
                // Each Category entity can be retrieved via node.Data property:
                // TreeExtensions.ITree<Category> categoryNode =
                //     flattenedCategories.First(node => node.Data.Name == "Fiction");
                
                //Category category = categoryNode.Data;
                // int level = categoryNode.Level;
                // bool isLeaf = categoryNode.IsLeaf;
                // bool isRoot = categoryNode.IsRoot;
                // ICollection<TreeExtensions.ITree<Category>> children = categoryNode.Children;
                // TreeExtensions.ITree<Category> parent = categoryNode.Parent;
                // List<Category> parentCates = TreeExtensions.GetParents(categoryNode);

                List<CategoryDtosBooksForSale> categoryDtosBooksForSales = new List<CategoryDtosBooksForSale>();
                foreach (var categoryNode in parentCategoriesWithSubCategories)
                {
                    var category = categoryNode.Data;
                    var catogoryDto = _mapper.Map<CategoryDtosBooksForSale>(category);
                    categoryDtosBooksForSales.Add(catogoryDto);
                }
                return Result<List<CategoryDtosBooksForSale>>.Success(categoryDtosBooksForSales);

            }
        }
    }
    
}

