using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books.Detail
{
    public class Detail
    {
        public class Query : IRequest<Result<BookDetailDto>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<BookDetailDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<BookDetailDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bookDetailDto = _context.Books.Include(x => x.Author)
                                            .Include(x => x.Language)
                                            .Include(x => x.Attributes).ThenInclude(x => x.Attribute)
                                            .ProjectTo<BookDetailDto>(_mapper.ConfigurationProvider)
                                            .FirstOrDefault(x => x.Id == request.Id);

                if (bookDetailDto == null)
                {
                    return Result<BookDetailDto>.Failure("Book is not exist");
                }

                return Result<BookDetailDto>.Success(bookDetailDto);
            }
        }
    }
}