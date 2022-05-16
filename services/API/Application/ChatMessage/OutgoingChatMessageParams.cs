using System;
using System.Collections.Generic;

namespace Application.ChatMessage
{
    public class OutgoingChatMessageParams
    {
        public long Id { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public string FromId { get; set; }
        public string FromUserName { get; set; }
        public string ToId { get; set; }
        public string ToUserName { get; set; }
        public DateTime? CreatedAt { get; set; }
        public List<string> Attachments { get; set; }
        public string Url { get; set; }
    }
}