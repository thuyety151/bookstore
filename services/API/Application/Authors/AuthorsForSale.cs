using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Authors
{
    public class AuthorsForSale
    {
        public class Query : IRequest<Result<List<AuthorDto>>>
        {
            public string SearchString { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<List<AuthorDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<AuthorDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var quantity = _context.ConfigQuantities
                    .FirstOrDefault(x => x.Key == ConfigQuantityName.TopAuthor.ToString())?.Quantity ?? 10;

                if (request.SearchString == null)
                {
                    var topAuthors = await _context.Authors.Where(x => x.IsDeleted == false).OrderBy(x => x.Books.Count)
                        .Select(x => new AuthorDto()
                        {
                            Id = x.Id,
                            Name = x.Name
                        }).Take(quantity).ToListAsync();

                    return Result<List<AuthorDto>>.Success(topAuthors);
                }
                else
                {
                    var topAuthors = _context.Authors.Where(x => x.IsDeleted == false && x.Name.Contains(request.SearchString)).OrderBy(x => x.Books.Count)
                        .Select(x => new AuthorDto()
                        {
                            Id = x.Id,
                            Name = x.Name
                        }).Take(quantity).ToList();

                    return Result<List<AuthorDto>>.Success(topAuthors);
                }

               
            }
        }
    }
}