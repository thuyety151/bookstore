using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Authors
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<AuthorDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<AuthorDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<AuthorDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var authors = _context.Authors
                    .Include(x => x.Media)
                    .Where(x => x.IsDeleted == false)
                    .ProjectTo<AuthorDto>(_mapper.ConfigurationProvider).AsQueryable();

                return Result<PagedList<AuthorDto>>.Success(
                    await PagedList<AuthorDto>.CreatePage(authors, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}