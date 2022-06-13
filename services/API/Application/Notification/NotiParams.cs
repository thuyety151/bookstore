using System;
using System.Collections.Generic;
namespace Application.Notification
{
    public class NotiParams
    {
        public string Metadata { get; set; }
        public List<string> UserIds { get; set; }
        public List<string> FcmTokens { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}