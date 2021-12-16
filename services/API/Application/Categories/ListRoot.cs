using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class ListRoot
    {
        public class Query : IRequest<Result<PagedList<CategoryDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<CategoryDto>>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<CategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var rootCategories =
                    _context
                        .Categories
                        .Where(x => x.IsDeleted == false && x.ParentId == null)
                        .Select(x =>
                            new CategoryDto()
                            {
                                Id = x.Id,
                                Name = x.Name,
                                Slug = x.Slug,
                                ParentId = x.ParentId,
                                SubTotal = x.SubCategories.Count(),
                                Media= x.Media
                            });
                return Result<PagedList<CategoryDto>>.Success(await PagedList<CategoryDto>.CreatePage(rootCategories,
                        request.Params.PageIndex,
                        request.Params.PageSize));
            }
        }
    }
}
