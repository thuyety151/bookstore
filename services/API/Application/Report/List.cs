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
                        var orders =
                            _context.Orders.Where(x => x.OrderDate.Year == currentYear && x.IsDeleted == false);
                        for (int i = 1; i <= 12; i++)
                        {
                            ReportDto reportDto = new ReportDto();
                            var month = i;
                            var ordersInMonth = orders.Where(x => x.OrderDate.Month == month);
                            reportDto.Name = month + "/" + currentYear;
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
                    case "this-month":
                        var currentMonth = DateTime.Now.Month;
                        var ordersThisMonth =
                            _context.Orders.Where(x => x.OrderDate.Month == currentMonth && x.IsDeleted == false);
                        var totalDay = DateTime.DaysInMonth(DateTime.Now.Year, currentMonth);
                        for (int i = 1; i <= totalDay; i++)
                        {
                            var day = i;
                            var ordersInDay = ordersThisMonth.Where(x => x.OrderDate.Day == day);

                            ReportDto reportDto = new ReportDto();

                            reportDto.Name = day.ToString() + '/' + currentMonth + '/' + DateTime.Now.Year;
                            reportDto.NetSale = ordersInDay.Sum(x => x.SubTotal);
                            reportDto.OrderPlaced = ordersInDay.Count();
                            reportDto.ItemsPurchased = ordersInDay
                                .Join(items,
                                    order => order.Id,
                                    item => item.OrderId,
                                    (order, item) => new
                                    {
                                        OrderId = order.Id,
                                        ItemId = item.Id,
                                        TotalItem = item.Quantity
                                    }).Sum(x => x.TotalItem);
                            reportDto.Refunded = ordersInDay.Where(x => x.PaymentStatus == PaymentStatus.Refund)
                                .Sum(x => x.SubTotal);
                            reportDto.ShippingFee = ordersInDay.Sum(x => x.OrderFee);

                            reports.Add(reportDto);
                        }

                        break;
                    case "last-month":
                        var lastMonth = DateTime.Now.Month == 1 ? 12 : DateTime.Now.Month - 1;
                        var ordersLastMonth =
                            _context.Orders.Where(x => x.OrderDate.Month == lastMonth && x.IsDeleted == false);
                        var totalDayLastMonth = DateTime.Now.Month == 12 ? DateTime.DaysInMonth(DateTime.Now.Year - 1, lastMonth) : DateTime.DaysInMonth(DateTime.Now.Year, lastMonth);
                        var currentLatsYear = DateTime.Now.Month == 1 ? DateTime.Now.Year - 1 : DateTime.Now.Year; 
                        for (int i = 1; i <= totalDayLastMonth; i++)
                        {
                            var day = i;
                            var ordersInDay = ordersLastMonth.Where(x => x.OrderDate.Day == day);

                            ReportDto reportDto = new ReportDto();

                            reportDto.Name = day.ToString() + '/' + lastMonth + '/' + currentLatsYear;
                            reportDto.NetSale = ordersInDay.Sum(x => x.SubTotal);
                            reportDto.OrderPlaced = ordersInDay.Count();
                            reportDto.ItemsPurchased = ordersInDay
                                .Join(items,
                                    order => order.Id,
                                    item => item.OrderId,
                                    (order, item) => new
                                    {
                                        OrderId = order.Id,
                                        ItemId = item.Id,
                                        TotalItem = item.Quantity
                                    }).Sum(x => x.TotalItem);
                            reportDto.Refunded = ordersInDay.Where(x => x.PaymentStatus == PaymentStatus.Refund)
                                .Sum(x => x.SubTotal);
                            reportDto.ShippingFee = ordersInDay.Sum(x => x.OrderFee);

                            reports.Add(reportDto);
                        }

                        break;
                    case "last-7-days":
                        var currentDay = DateTime.Now.Day;
                        var ordersLast7Days = _context.Orders.Where(x =>
                            x.OrderDate.Day >= currentDay - 7 && x.OrderDate.Day <= currentDay && x.IsDeleted == false);
                        for (int i = 6; i >= 0; i--)
                        {
                            var day = currentDay - i;
                            var ordersInDay = ordersLast7Days.Where(x => x.OrderDate.Day == day);

                            ReportDto reportDto = new ReportDto();

                            reportDto.Name = day.ToString() + '/' + DateTime.Today.Month + '/' + DateTime.Today.Year;
                            reportDto.NetSale = ordersInDay.Sum(x => x.SubTotal);
                            reportDto.OrderPlaced = ordersInDay.Count();
                            reportDto.ItemsPurchased = ordersInDay
                                .Join(items,
                                    order => order.Id,
                                    item => item.OrderId,
                                    (order, item) => new
                                    {
                                        OrderId = order.Id,
                                        ItemId = item.Id,
                                        TotalItem = item.Quantity
                                    }).Sum(x => x.TotalItem);
                            reportDto.Refunded = ordersInDay.Where(x => x.PaymentStatus == PaymentStatus.Refund)
                                .Sum(x => x.SubTotal);
                            reportDto.ShippingFee = ordersInDay.Sum(x => x.OrderFee);

                            reports.Add(reportDto);
                        }
                        break;
                }


                return Result<List<ReportDto>>.Success(reports);
            }
        }
    }
}