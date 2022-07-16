using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;
namespace Application.Settings
{
    public class ShopLocation
    {
        public class  Query : IRequest<Result<ConfigHomePage>>
        {
            
        }
        
        public class Handler : IRequestHandler<Query, Result<ConfigHomePage>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }

            public async Task<Result<ConfigHomePage>> Handle(Query request, CancellationToken cancellationToken)
            {
                var settings = await _context.ConfigHomePages
                    .FirstOrDefaultAsync(x => x.Key == "Address");

                return Result<ConfigHomePage>.Success(settings);
            }
        }
    }
}