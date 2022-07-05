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
    public class List
    {
        public class  Query : IRequest<Result<List<ConfigHomePage>>>
        {
            
        }
        
        public class Handler : IRequestHandler<Query, Result<List<ConfigHomePage>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }

            public async Task<Result<List<ConfigHomePage>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var settings =await _context.ConfigHomePages
                    .ToListAsync();

                return Result<List<ConfigHomePage>>.Success(settings);
            }
        }
    }
}