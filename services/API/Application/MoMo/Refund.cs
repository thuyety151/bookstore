using System;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using FluentValidation;
using Infrastructure.MoMo;
using MediatR;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Persistence;

namespace Application.MoMo
{
    public class Refund
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid OrderId { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.OrderId).NotEqual(Guid.Empty);
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = _context.Orders.FirstOrDefault(x => x.Id == request.OrderId);

                if (order == null)
                {
                    return Result<Unit>.Failure("Payment error. Order does not existed");
                }
                string endpoint = "https://test-payment.momo.vn/v2/gateway/api/refund";
                string partnerCode = _configuration["MoMo:PartnerCode"];
                string orderId = Guid.NewGuid().ToString();
                string requestId = Guid.NewGuid().ToString();
                long amount = (long)(order.SubTotal + order.OrderFee) * 23000;
                long transId = order.TransId;
                string accessKey = _configuration["MoMo:AccessKey"];
                string secretKey = _configuration["MoMo:SecretKey"];
                string description = "";
                string publicKey =
                    "<RSAKeyValue><Modulus>iZeKssbft00JVb2hl/z996I9ZvNYower7TsIB9P/nrANrsVoy+Pi0f+WootQGN4QqWRiLNTZa0B5TELnWTT91WkhF4K4KrEU7TEVwMPsdD3WsnBssYsPbpZ/RJlYGNMvWX/+GQxZbuf9qrmqA9itzGZwGdyjDpWD5JCzTXf+2AKHc166JuQlj9XsVI21IXgfRBSvvOIdIJVcBckqRt1ZAt2ACBzovhBA14AI6QM6qmdcRK3vGHIwT1os7iCzr3I/chive19HQcN8PxEzNYbA+CTd8G6US4XaK5Iq4i+tuKZANFocpw0cHKTiTbFZKpIHRinw1SXeP0Ec/JGTQLkpI17wb+sawMMH6wrp3t6QndmuHgoQP9vmeXFIA27UeM2s8QYFErdmOXV+9BfyTontb53y+7WCX4sEGkJ0A/q0sTxSaX9IDJ5j9cIXH5JsBzWZuuHGX9uf7pwMto1cNJXUgLHhclPv4UXtSW9SpR/SmhXrXlc2d4cWZBsjTiVFttAI2X75h1L4gXe+batQJSaD+5nzTlfvrjjBObTGDS8jhsgoSLhruWxQ36+vKkvOgmYEIc5pJ4Sk9MC3JvAprCOZH4mUWC7b1yVAj8jRr10Vl7goZbFUSFy5w58hHkKyP504BpRbC1XwwegMLg9rUG8Zw2B/aPeybQzgdKE3m8qZhTk=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
                
                //Before sign HMAC SHA256 signature
                string rawHash = "accessKey=" + accessKey +
                                 "&amount=" + amount +
                                 "&description=" + description +
                                 "&orderId=" + orderId +
                                 "&partnerCode=" + partnerCode +
                                 "&requestId=" + requestId +
                                 "&transId=" + transId
                    ;
                MoMoSecurity crypto = new MoMoSecurity();
                
                //Sign signature SHA256
                string signature = crypto.signSHA256(rawHash, secretKey);
               
                //build body json request
                JObject message = new JObject
                {
                    { "partnerCode", partnerCode },
                    { "orderId", orderId },
                    { "requestId", requestId },
                    { "amount", amount },
                    {"transId", transId},
                    { "lang", "en" },
                    { "description", description },
                    { "signature", signature }

                };

                string responseFromMomoString = PaymentRequest.sendPaymentRequest(endpoint, message.ToString());

                JObject responseFromMomo = JObject.Parse(responseFromMomoString);

                string resultCode = responseFromMomo.GetValue("resultCode").ToString();

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}