namespace API.DTOs
{
    public class UpdateAccountPasswordDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}