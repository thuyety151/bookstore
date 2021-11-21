using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class OrderStatus
    {
        [Key]
        public string Key { get; set; }
        public string Name { get; set; }
    }
}