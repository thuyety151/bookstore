using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper.Configuration;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;
namespace Application.Notification.Admin
{
    public class SendNoti
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SendNotiParams SendNotiParams { get; set; }
        }

        public class CommandValidator : AbstractValidator<SendNoti.Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.SendNotiParams.Title).NotEmpty();
                RuleFor(x => x.SendNotiParams.Contents).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<SendNoti.Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;
            private readonly IConfiguration _configuration;
            private readonly HttpClient _httpClient;
            
            public Handler(DataContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
                _httpClient = new HttpClient()
                {
                    BaseAddress = new Uri("https://fcm.googleapis.com")
                };
            }

            public async Task<Result<Unit>> Handle(SendNoti.Command request, CancellationToken cancellationToken)
            {

                var users = _context.Users.Include(x => x.FcmTokens).AsQueryable();
                if (request.SendNotiParams.UserIds.Count>0)
                {
                    users = users.Where(x => request.SendNotiParams.UserIds.Contains(x.Id));
                }

                var metadata = new
                {
                    title = request.SendNotiParams.Title,
                    body = new
                    {
                        custom = true,
                        contents = request.SendNotiParams.Contents
                    },
                    mutable_content = true,
                    sound = "Tri-tone",
                };
                var noti = new Domain.Notification()
                {
                    Id = new Guid(),
                    Metadata = JsonSerializer.Serialize(metadata),
                    CreatedDate = DateTime.Now,
                    IsCustom = true
                };

                _context.Notifications.Add(noti);

                var listUserNoti = new List<UserNoti>();

                // send noti with firebase
                // _httpClient.DefaultRequestHeaders.Authorization= AuthenticationHeaderValue.Parse("key=AAAAlvn5n-w:APA91bEyD7Ft7wUxd0bQpNqe-EXYg3y9DfkSd5IeCQKLkFsdgqVhFY1zJl65RFdjfHt3KiBaInJs1jUL_I8UjWNc9JyJdrch6Qm262VdPx-UTD3e6AUwBImxwAFvjQL0RTPCv61Dw3W7");
                _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", string.Format("key=AAAAlvn5n-w:APA91bEyD7Ft7wUxd0bQpNqe-EXYg3y9DfkSd5IeCQKLkFsdgqVhFY1zJl65RFdjfHt3KiBaInJs1jUL_I8UjWNc9JyJdrch6Qm262VdPx-UTD3e6AUwBImxwAFvjQL0RTPCv61Dw3W7"));
                var token = "AAAAlvn5n-w:APA91bEyD7Ft7wUxd0bQpNqe-EXYg3y9DfkSd5IeCQKLkFsdgqVhFY1zJl65RFdjfHt3KiBaInJs1jUL_I8UjWNc9JyJdrch6Qm262VdPx-UTD3e6AUwBImxwAFvjQL0RTPCv61Dw3W7";
                _httpClient.DefaultRequestHeaders
                    .Accept
                    .Add(new MediaTypeWithQualityHeaderValue("application/json"));//
                
                foreach (var user in users)
                {
                    listUserNoti.Add(new Domain.UserNoti()
                    {
                        UserId = user.Id,
                        NotificationId = noti.Id
                    });
                    var data = new
                    {
                        to = user.FcmTokens.FirstOrDefault()?.Token,
                        notification = new
                        {
                            title = request.SendNotiParams.Title,
                            body = request.SendNotiParams.Contents,
                            mutable_content = true,
                            sound = "Tri-tone",
                        }
                    };
                    var url = string.Format("/fcm/send");
                    var orderCodesJson = JsonSerializer.Serialize(data);
                    var requestContent =   new StringContent(orderCodesJson, Encoding.UTF8, "application/json");
                    var response = await _httpClient.PostAsync(url,
                        new StringContent(JsonSerializer.Serialize(data), Encoding.UTF8, "application/json"));
                    Console.WriteLine("X");
                }

                await _context.UserNotis.AddRangeAsync(listUserNoti, cancellationToken);

               
           
              


                await _context.SaveChangesAsync(cancellationToken);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}