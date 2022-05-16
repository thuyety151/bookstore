using Domain;
namespace API.DTOs
{
    public class UpdateAccountInforDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Media Photo { get; set; }
    }
}