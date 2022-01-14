using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class List
    {
        public class Query : IRequest<Result<ICollection<CategoryDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<ICollection<CategoryDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<ICollection<CategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var quantity= _context.ConfigHomePages.SingleOrDefault(x => x.Key == ConfigQuantityName.TopCategory.ToString()).Quantity;
                var categories = _context.Categories.Where(x => x.IsDeleted == false &&x.ParentId==null).Take(quantity)
                 .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).ToList();


                return Result<ICollection<CategoryDto>>.Success(categories);
            }
        }
    }
}