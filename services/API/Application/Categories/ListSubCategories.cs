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

namespace Application.Categories
{
    public class ListSubCategories
    {
        public class Query : IRequest<Result<CategoryDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CategoryDto>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<CategoryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var subCategories = await _context.Categories.Include(x => x.SubCategories).Where(x => x.IsDeleted == false && x.Id == request.Id)
                        .Select(x => new CategoryDto()
                        {
                            Id = x.Id,
                            Name = x.Name,
                            Slug = x.Slug,
                            SubTotal = x.SubCategories.Count(),
                            SubCategories = x.SubCategories.Select(x => new CategoryDto()
                            {
                                Id = x.Id,
                                Name = x.Name,
                                Slug = x.Slug,
                                ParentId = x.ParentId,
                                SubTotal = x.SubCategories.Count()
                            }).ToList()
                        }).SingleOrDefaultAsync();
                return Result<CategoryDto>.Success(subCategories);
            }
        }
    }
}
