﻿using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Books;
using Application.Core;
using Domain;
using Domain.Constant;
using Domain.Enum;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Notification.Admin
{
    public class ListAdmin
    {
        public class Query : IRequest<Result<PagedList<NotiDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<NotiDto>>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }

            public async Task<Result<PagedList<NotiDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var notis = _context.Notifications.Include(x => x.Users).Where(x =>
                        x.IsCustom == true)
                    // .OrderByDescending(n => n.CreatedDate)
                    .Select(n => new NotiDto()
                    {
                        Id = n.Id,
                        Metadata = n.Metadata,
                        CreatedDate = n.CreatedDate,
                        Count = n.Users.Count
                    }).OrderByDescending(x => x.CreatedDate).AsQueryable();
                return Result<PagedList<NotiDto>>.Success(await PagedList<NotiDto>.CreatePage(notis, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}