namespace Domain.Enum
{
    public enum Status
    {
        Processing,
        PendingPayment,
        OnHold,
        Completed,
        Cancelled,
        Refunded,
        Failed
    }
}