using System;
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
    public class Detail
    {
        public class Query : IRequest<Result<AuthorDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<AuthorDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<AuthorDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var author = _context.Authors
                    .Include(x => x.Media)
                    .Where(x => x.IsDeleted == false && x.Id == request.Id)
                  
                    .SingleOrDefaultAsync();

                return Result<AuthorDto>.Success(_mapper.Map<AuthorDto>(author));
            }
        }
    }
}