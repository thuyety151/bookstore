using System;
namespace Domain
{
    public class Media
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public bool IsVideo { get; set; }
        public bool IsExcel { get; set; }
        public bool IsSuccess { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Description { get; set; }
    }
}