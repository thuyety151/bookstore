using System.Collections.Generic;
namespace Application.Notification
{
    public class ListNotiDto
    {
        public int UnRead { get; set; }
        public List<NotiDto> Data { get; set; }
    }
}