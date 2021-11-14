namespace API.DTOs
{
    public class UpdateAccountDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}