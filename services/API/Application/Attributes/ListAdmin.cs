using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;
using Attribute = Domain.Attribute;

namespace Application.Attributes
{
    public class ListAdmin
    {
        public class  Query : IRequest<Result<PagedList<Attribute>>>
        {
            public PagingParams Params { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<PagedList<Attribute>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }
            public async Task<Result<PagedList<Attribute>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var attributes = _context.Attributes.Where(x => x.IsDeleted == false).OrderByDescending(x => x.CreateDate).AsQueryable();

                return Result<PagedList<Attribute>>.Success(await PagedList<Attribute>.CreatePage(attributes, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}