﻿using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Books;
using Application.Core;
using Domain;
using Domain.Enum;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Notification
{
    public class List
    {
        public class Query : IRequest<Result<ListNotiDto>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<ListNotiDto>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }

            public async Task<Result<ListNotiDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var notis = _context.UserNotis.Include(x => x.Notification)
                    .Where(x =>
                        x.UserId == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier))
                    .Select(x => new NotiDto()
                    {
                        Id = x.NotificationId,
                        Metadata = x.Notification.Metadata,
                        CreatedDate = x.Notification.CreatedDate,
                        IsRead = x.IsRead,
                        IsCustom = x.Notification.IsCustom
                    })
                    .OrderByDescending(x => x.CreatedDate);
                return Result<ListNotiDto>.Success( new ListNotiDto()
                {
                    UnRead = notis.Count(x=>x.IsRead==false),
                    Data = notis.ToList()
                });
            }
        }
    }
}