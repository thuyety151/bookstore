using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace Domain
{
    public class ChatMessage
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Body { get; set; }
        public string Type { get; set; }
        public string ToId { get; set; }
        [ForeignKey("ToId")]
        public AppUser To { get; set; }
        public string FromId { get; set; }
        [ForeignKey("FromId")]
        public AppUser From { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}