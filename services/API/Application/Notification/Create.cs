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
                RuleFor(x => x.NotiParams.UserIds).NotEmpty();
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
                var users = _context.Users.Where(x => request.NotiParams.UserIds.Contains(x.Id)).ToList();
                var noti = new Domain.Notification()
                {
                    Id = new Guid(),
                    Metadata = request.NotiParams.Metadata,
                    CreatedDate = request.NotiParams.CreatedDate
                };
                _context.Notifications.Add(noti);

                var listUserNoti = new List<UserNoti>();

                foreach (var user in users)
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