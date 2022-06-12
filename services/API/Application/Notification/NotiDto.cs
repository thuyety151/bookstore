using System;
using System.Collections.Generic;
namespace Application.Notification
{
    public class NotiDto
    {
        public Guid Id { get; set; }
        public string Metadata { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsRead { get; set; }
    }
}