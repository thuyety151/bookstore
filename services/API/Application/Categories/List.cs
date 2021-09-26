using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class List
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
                var categories = _context.Categories.Where(x => x.IsDeleted == false)
                 .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).AsQueryable();

                return Result<PagedList<CategoryDto>>.Success(await PagedList<CategoryDto>.CreatePage(categories, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}