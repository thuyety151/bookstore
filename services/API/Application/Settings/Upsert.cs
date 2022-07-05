using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Orders;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;
namespace Application.Settings
{
    public class Upsert
    {
        public class Command : IRequest<Result<Unit>>
        {
            public List<ConfigHomePage> Configs { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var configs = await _context.ConfigHomePages.ToListAsync();
                foreach (var item in request.Configs.Select((value, index) => new { value, index }))
                {
                    configs[item.index].Quantity = item.value.Quantity;
                    configs[item.index].MetaData = item.value.MetaData == null ? null : item.value.MetaData;
                    configs[item.index].DefaultAttributeId = item.value.DefaultAttributeId ;
                }
                await _context.SaveChangesAsync(cancellationToken);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}