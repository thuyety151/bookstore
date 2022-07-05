using System.Collections.Generic;
namespace Application.Notification.Admin
{
    public class SendNotiParams
    {
        public List<string> UserIds { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
    }
}