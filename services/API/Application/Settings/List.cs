using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;
namespace Application.Settings
{
    public class List
    {
        public class  Query : IRequest<Result<List<ConfigHomePageDto>>>
        {
            
        }
        
        public class Handler : IRequestHandler<Query, Result<List<ConfigHomePageDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }

            public async Task<Result<List<ConfigHomePageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var settings =await _context.ConfigHomePages
                    .Select(x=> new ConfigHomePageDto()
                    {
                        Id = x.Id,
                        Quantity = x.Quantity,
                        Key = x.Key,
                        DefaultAttributeId = x.DefaultAttributeId == Guid.Empty ? (Guid?) null : x.DefaultAttributeId ,
                        MetaData = x.MetaData.Length>0  ? JsonConvert.DeserializeObject<Guid[]>(x.MetaData) : null
                    }).ToListAsync();

                return Result<List<ConfigHomePageDto>>.Success(settings);
            }
        }
    }
}