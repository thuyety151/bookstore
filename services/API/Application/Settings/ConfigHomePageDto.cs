using System;
namespace Application.Settings
{
    public class ConfigHomePageDto
    {
        public Guid Id { get; set; }
        public string Key { get; set; }
        public int Quantity { get; set; }
        public Guid? DefaultAttributeId { get; set; }
        public Guid[] MetaData { get; set; }
    }
}