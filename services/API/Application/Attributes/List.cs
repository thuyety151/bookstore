using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Persistence;

namespace Application.Attributes
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<AttributeDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<AttributeDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<PagedList<AttributeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var attributes = _context.Attributes.Where(x => x.IsDeleted == false)
                    .ProjectTo<AttributeDto>(_mapper.ConfigurationProvider).AsQueryable();

                return Result<PagedList<AttributeDto>>.Success(await PagedList<AttributeDto>.CreatePage(attributes, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}