using System;
using System.Collections.Generic;
namespace Domain
{
    public class Notification
    {
        public Guid Id { get; set; }
        public ICollection<UserNoti> Users { get; set; }
        public string Metadata { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsCustom { get; set; }
    }
}