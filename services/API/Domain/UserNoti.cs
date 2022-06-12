using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace Domain
{
    public class UserNoti
    {
        public Guid NotificationId { get; set; }
        public Notification Notification { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public bool IsRead { get; set; }
    }
}