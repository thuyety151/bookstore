using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using FluentValidation;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Persistence;

namespace Application.ChatMessage
{
    public class SendMessage
    {
        public class Command : IRequest<Result<OutgoingChatMessageParams>>
        {
            public string Message { get; set; }
            public string FromId { get; set; }
            public string ToId { get; set; }
        }

        // public class CommandValidator : AbstractValidator<Command>
        // {
        //     public CommandValidator()
        //     {
        //         RuleFor(x => x.IncomingChatMessageParams.Message).NotEmpty();
        //     }
        // }
        
        public class Handler: IRequestHandler<Command, Result<OutgoingChatMessageParams>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;

            public Handler(IUserAccessor userAccessor, DataContext context)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            
            public async Task<Result<OutgoingChatMessageParams>> Handle(Command request, CancellationToken cancellationToken)
            {
                var chatMessage = new Domain.ChatMessage()
                {
                    Body = request.Message,
                    FromId = request.FromId,
                    ToId = request.ToId,
                    Type = "text",
                    CreatedAt = DateTime.Now,
                };
                await _context.ChatMessages.AddAsync(chatMessage);
                await _context.SaveChangesAsync();
                
                var outgoingMessage = new OutgoingChatMessageParams()
                {
                    Id = chatMessage.Id,
                    FromId = chatMessage.FromId,
                    ToId = chatMessage.ToId,
                    Message = chatMessage.Body,
                    CreatedAt = chatMessage.CreatedAt,
                    FromUserName = request.FromId,
                    ToUserName = request.ToId,
                    Type= "text",
                };
              
                return Result<OutgoingChatMessageParams>.Success(outgoingMessage);
            }
        }
    }
}