using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;
namespace Application.Notification
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public NotiParams NotiParams { get; set; }
        }

        public class CommandValidator : AbstractValidator<Create.Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.NotiParams.Metadata).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;

            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var users=new List<AppUser>();
                if (request.NotiParams.UserIds == null)
                {
                    users= _context.Users.Include(x => x.FcmTokens)
                        .Where(x => request.NotiParams.FcmTokens.Contains(x.FcmTokens.FirstOrDefault().Token)).ToList();
                }
                else
                {
                    users = _context.Users.Where(x => request.NotiParams.UserIds.Contains(x.Id)).ToList();
                }
                
                if (request.NotiParams.FcmTokens.Count > 0)
                {
                    users = new List<AppUser>(_context.Users
                        .Where(x => x.FcmTokens.Any(t => request.NotiParams.FcmTokens.Contains(t.Token))));
                }
                
                var noti = new Domain.Notification()
                {
                    Id = new Guid(),
                    Metadata = request.NotiParams.Metadata,
                    CreatedDate = request.NotiParams.CreatedDate,
                    IsCustom = request.NotiParams.IsCustom
                };
                
                _context.Notifications.Add(noti);

                var listUserNoti = new List<UserNoti>();

                foreach (var user in users.Distinct().ToList())
                {
                    listUserNoti.Add(new Domain.UserNoti()
                    {
                        UserId = user.Id,
                        NotificationId = noti.Id
                    });
                }

                await _context.UserNotis.AddRangeAsync(listUserNoti);
                await _context.SaveChangesAsync(cancellationToken);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}