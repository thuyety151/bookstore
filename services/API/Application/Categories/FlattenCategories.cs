using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Extensions;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class FlattenCategory
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
                List<Category> parents = await _context.Categories.Include(x => x.ParentCategory).ToListAsync();

                TreeExtensions.ITree<Category> virtualRootNode =
                    parents.ToTree((parent, child) => child.ParentId == parent.Id);

                var flattenedCategories =
                    virtualRootNode.Children.Flatten(node => node.Children).Select(x => x.Data).ToList();

                var result = new List<CategoryDtosBooksForSale>();
                foreach (var flattened in flattenedCategories)
                {
                    result.Add(_mapper.Map<CategoryDtosBooksForSale>(flattened));
                }

                return Result<List<CategoryDtosBooksForSale>>.Success(result);

            }
        }
    }
    
}

