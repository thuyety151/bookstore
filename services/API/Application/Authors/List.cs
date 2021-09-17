using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Authors
{
    public class List
    {
        public class  Query : IRequest<Result<PagedList<AuthorDto>>>
        {
            public PagingParams Params { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<PagedList<AuthorDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<PagedList<AuthorDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var authors = _context.Authors.Where(x => x.IsDeleted == false)
                    .Select(x => new AuthorDto()
                    {
                        Id = x.Id,
                        Name = x.Name
                    });

                return Result<PagedList<AuthorDto>>.Success(await PagedList<AuthorDto>.CreatePage(authors, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}