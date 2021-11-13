using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Attributes;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Persistence;

namespace Application.Languages
{
    public class List
    {
        public class  Query : IRequest<Result<PagedList<Language>>>
        {
            public PagingParams Params { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<PagedList<Language>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<PagedList<Language>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var languages = _context.Languages.AsQueryable();

                return Result<PagedList<Language>>.Success(await PagedList<Language>.CreatePage(languages, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}