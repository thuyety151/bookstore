using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.Enum;
using MediatR;
using Persistence;

namespace Application.Report
{
    public class List
    {
        public class Query : IRequest<Result<List<ReportDto>>>
        {
            public string Range { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<List<ReportDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<ReportDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var reports = new List<ReportDto>();
                var items = _context.Items.AsQueryable();
               
                switch (request.Range)
                {
                    case "year":
                        var currentYear = DateTime.Now.Year;
                        var orders = _context.Orders.Where(x => x.OrderDate.Year == currentYear && x.IsDeleted == false);
                        for (int i = 1; i <= 12; i++)
                        {
                            ReportDto reportDto = new ReportDto();
                            var ordersInMonth = orders.Where(x => x.OrderDate.Month == i);
                            reportDto.Name = i.ToString();
                            reportDto.NetSale = ordersInMonth.Sum(x => x.SubTotal);
                            reportDto.OrderPlaced = ordersInMonth.Count();
                            reportDto.ItemsPurchased = ordersInMonth
                                .Join(items,
                                    order => order.Id,
                                    item => item.OrderId,
                                    (order, item) => new
                                    {
                                        OrderId = order.Id,
                                        ItemId = item.Id,
                                        TotalItem = item.Quantity
                                    }).Sum(x => x.TotalItem);
                            reportDto.Refunded = ordersInMonth.Where(x => x.PaymentStatus == PaymentStatus.Refund)
                                .Sum(x => x.SubTotal);
                            reportDto.ShippingFee = ordersInMonth.Sum(x => x.OrderFee);
                            
                            reports.Add(reportDto);
                            
                        }
                        break;
                }

                return Result<List<ReportDto>>.Success(reports);
            }
        }
    }
}