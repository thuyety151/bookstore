using System.Collections.Generic;
namespace API.DTOs
{
    public class UserOptionDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public List<string> FcmTokens { get; set; }
    }
}