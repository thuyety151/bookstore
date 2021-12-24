namespace Application.MoMo
{
    public class PaymentNotificationParams
    {
        public string OrderId { get; set; }
        public long TransId { get; set; }
        public int ResultCode { get; set; }
    }
}