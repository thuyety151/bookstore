namespace Application.Report
{
    public class ReportDto
    {
        public string Name { get; set; }
        public double Coupons { get; set; }
        public double ShippingFee { get; set; }
        public double Refunded { get; set; }
        public int ItemsPurchased { get; set; }
        public int OrderPlaced { get; set; }
        public double NetSale { get; set; }
    }
}