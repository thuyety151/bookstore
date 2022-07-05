using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.ChatMessage
{
    public class IncomingChatMessageParams
    {
        public string Message { get; set; }
        public string FromId { get; set; }
        public string ToId { get; set; }
        //public List<IFormFile> Attachments { get; set; }
        public string Type { get; set; }
       // public bool IsTypeSet => !string.IsNullOrWhiteSpace(Type);
       // public IFormFile Video { get; set; }
    }
}