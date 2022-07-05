using System.Threading.Tasks;
using Application.ChatMessage;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendMessage(SendMessage.Command command)
        {
            var sendMessage = await _mediator.Send(command);
            var userId = "9316eebb-b823-4b5c-89af-5e7f67d06ab2";
            
            await Clients.Group(userId)
                .SendAsync("ReceiveMessage", sendMessage.Value);
        }

        // public override async Task OnConnectedAsync()
        // {
        //     var httpContext = Context.GetHttpContext();
        //     //var userId = httpContext.Request.Query["activityId"];
        //     var userId = "9316eebb-b823-4b5c-89af-5e7f67d06ab2";
        //     await Groups.AddToGroupAsync(Context.ConnectionId, userId);
        //    // var result = await _mediator.Send(new List.Query{ActivityId = Guid.Parse(activityId)});
        //    // await Clients.Caller.SendAsync("LoadComments", result.Value);
        // }
    }
}