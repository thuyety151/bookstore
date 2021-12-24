using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.Enum;
using Infrastructure.MoMo;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Persistence;

namespace Application.MoMo
{
    public class Create
    {
        public class Command : IRequest<Result<string>>
        {
            public Guid OrderId { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<string>>
        {
            private readonly IConfiguration _configuration;
            private readonly DataContext _context;

            public Handler(IConfiguration configuration, DataContext context)
            {
                _configuration = configuration;
                _context = context;
            }
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == request.OrderId);

                if (order == null)
                {
                    return Result<string>.Failure("Payment error. Order does not existed");
                }
                string endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
                string partnerCode = _configuration["MoMo:PartnerCode"];
                string accessKey = _configuration["MoMo:AccessKey"];
                string secretKey = _configuration["MoMo:SecretKey"];
                string orderInfo = "Test order";
                string redirectUrl = _configuration["MoMo:RedirectUrl"] + order.Id;
                string ipnUrl = "https://momo.vn";
                string requestType = "captureWallet";

                long amount = (long)(order.SubTotal + order.OrderFee) * 23000;
                string orderId = request.OrderId.ToString();
                string requestId = Guid.NewGuid().ToString();
                string extraData = "";
                
                //Before sign HMAC SHA256 signature
                string rawHash = "accessKey=" + accessKey +
                                 "&amount=" + amount +
                                 "&extraData=" + extraData +
                                 "&ipnUrl=" + ipnUrl +
                                 "&orderId=" + orderId +
                                 "&orderInfo=" + orderInfo +
                                 "&partnerCode=" + partnerCode +
                                 "&redirectUrl=" + redirectUrl +
                                 "&requestId=" + requestId +
                                 "&requestType=" + requestType
                    ;

                MoMoSecurity crypto = new MoMoSecurity();
                
                //Sign signature SHA256
                string signature = crypto.signSHA256(rawHash, secretKey);
                
                //build body json request
                JObject message = new JObject
                {
                    { "partnerCode", partnerCode },
                    { "partnerName", "Test" },
                    { "storeId", "MomoTestStore" },
                    { "requestId", requestId },
                    { "amount", amount },
                    { "orderId", orderId },
                    { "orderInfo", orderInfo },
                    { "redirectUrl", redirectUrl },
                    { "ipnUrl", ipnUrl },
                    { "lang", "en" },
                    { "extraData", extraData },
                    { "requestType", requestType },
                    { "signature", signature }

                };

                string responseFromMomoString = PaymentRequest.sendPaymentRequest(endpoint, message.ToString());

                JObject responseFromMomo = JObject.Parse(responseFromMomoString);

                string payUrl = responseFromMomo.GetValue("payUrl").ToString();

                if (!string.IsNullOrEmpty(payUrl))
                {
                    order.PaymentStatus = PaymentStatus.Completed;
                    await _context.SaveChangesAsync();
                }

                return Result<string>.Success(payUrl);
            }
        }
    }
}