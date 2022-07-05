using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;
namespace Application.Books.Import
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Media>>>
        {
            public PagingParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<Media>>>
        {
            private readonly DataContext _context;

            
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<PagedList<Media>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var data = _context.Media.Where(x => x.IsExcel == true).OrderByDescending(x=>x.CreatedAt).AsQueryable();
                return Result<PagedList<Media>>.Success(await PagedList<Media>.CreatePage(data, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}