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
            public string Predicate { get; set; }
            public PagingParams Params { get; set; }
            public string Keywords { get; set; }
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
                if (request.Predicate == "all")
                {
                    var authors = _context.Authors
                        .Include(x => x.Media).Where(x => x.IsDeleted == false)
                        .ProjectTo<AuthorDto>(_mapper.ConfigurationProvider).AsQueryable();
                    if (!string.IsNullOrWhiteSpace(request.Keywords))
                    {
                        authors = authors.Where(x => x.Name.ToLower().Contains(request.Keywords));
                    }
                    return Result<PagedList<AuthorDto>>.Success(
                        await PagedList<AuthorDto>.CreatePage(authors, request.Params.PageIndex,
                            request.Params.PageSize));
                }
                else
                {
                    var authors = _context.Authors
                        .Include(x => x.Media).Where(x =>
                            x.IsDeleted == false && x.Name.Substring(0, 1) == request.Predicate)
                        .ProjectTo<AuthorDto>(_mapper.ConfigurationProvider).AsQueryable();
                   
                    return Result<PagedList<AuthorDto>>.Success(
                        await PagedList<AuthorDto>.CreatePage(authors, request.Params.PageIndex,
                            request.Params.PageSize));
                }
            }
        }
    }
}