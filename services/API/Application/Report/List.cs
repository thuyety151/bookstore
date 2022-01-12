using System;
using System.Collections.Generic;
using System.Globalization;
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
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
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
                        var lastMonth = DateTime.Now.AddMonths(-1).Month;
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
                        var last7Day = DateTime.Now.AddDays(-7);
                        var ordersLast7Days = _context.Orders.Where(x => x.IsDeleted);
                        for (int i = 0; i <= 7; i++)
                        {
                            var day = last7Day.AddDays(i);
                            var ordersInDay = ordersLast7Days.Where(x => x.OrderDate == day);

                            ReportDto reportDto = new ReportDto();

                            reportDto.Name = day.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
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
                    case "custom":
                        var totalDays = (request.EndDate - request.StartDate).Days;
                        var totalMonths = GetMonthDifference(request.StartDate, request.EndDate);
                        var ordersCustom = _context.Orders.Where(x => x.IsDeleted == false);
                        if (totalMonths <= 2) // display by day
                        {
                            for (int i = 0; i <= totalDays; i++)
                            {
                                var date = request.StartDate.AddDays(i);
                                var ordersByDay = ordersCustom.Where(x => x.OrderDate.Day == date.Day && x.OrderDate.Month == date.Month && x.OrderDate.Year == date.Year);

                                ReportDto reportDto = new ReportDto();

                                reportDto.Name = date.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
                                reportDto.NetSale = ordersByDay.Sum(x => x.SubTotal);
                                reportDto.OrderPlaced = ordersByDay.Count();
                                reportDto.ItemsPurchased = ordersByDay
                                    .Join(items,
                                        order => order.Id,
                                        item => item.OrderId,
                                        (order, item) => new
                                        {
                                            OrderId = order.Id,
                                            ItemId = item.Id,
                                            TotalItem = item.Quantity
                                        }).Sum(x => x.TotalItem);
                                reportDto.Refunded = ordersByDay.Where(x => x.PaymentStatus == PaymentStatus.Refund)
                                    .Sum(x => x.SubTotal);
                                reportDto.ShippingFee = ordersByDay.Sum(x => x.OrderFee);

                                reports.Add(reportDto);
                            }
                        }
                        else if (totalMonths <= 24) // display by month
                        {
                            for (int i = 0; i <= totalMonths; i++)
                            {
                                var date = request.StartDate.AddMonths(i);
                                var ordersByMonths = ordersCustom.Where(x => x.OrderDate.Month == date.Month && x.OrderDate.Year == date.Year);

                                ReportDto reportDto = new ReportDto();

                                reportDto.Name = date.ToString("MM/yyyy", CultureInfo.InvariantCulture);;
                                reportDto.NetSale = ordersByMonths.Sum(x => x.SubTotal);
                                reportDto.OrderPlaced = ordersByMonths.Count();
                                reportDto.ItemsPurchased = ordersByMonths
                                    .Join(items,
                                        order => order.Id,
                                        item => item.OrderId,
                                        (order, item) => new
                                        {
                                            OrderId = order.Id,
                                            ItemId = item.Id,
                                            TotalItem = item.Quantity
                                        }).Sum(x => x.TotalItem);
                                reportDto.Refunded = ordersByMonths.Where(x => x.PaymentStatus == PaymentStatus.Refund)
                                    .Sum(x => x.SubTotal);
                                reportDto.ShippingFee = ordersByMonths.Sum(x => x.OrderFee);

                                reports.Add(reportDto);
                            }

                        }
                        else
                        {
                            var totalYears = request.EndDate.Year - request.StartDate.Year;
                            for (int i = 0; i <= totalYears; i++)
                            {
                                var date = request.StartDate.AddYears(i);
                                var ordersByYears = ordersCustom.Where(x => x.OrderDate.Year == date.Year);

                                ReportDto reportDto = new ReportDto();

                                reportDto.Name = date.Year.ToString();;
                                reportDto.NetSale = ordersByYears.Sum(x => x.SubTotal);
                                reportDto.OrderPlaced = ordersByYears.Count();
                                reportDto.ItemsPurchased = ordersByYears
                                    .Join(items,
                                        order => order.Id,
                                        item => item.OrderId,
                                        (order, item) => new
                                        {
                                            OrderId = order.Id,
                                            ItemId = item.Id,
                                            TotalItem = item.Quantity
                                        }).Sum(x => x.TotalItem);
                                reportDto.Refunded = ordersByYears.Where(x => x.PaymentStatus == PaymentStatus.Refund)
                                    .Sum(x => x.SubTotal);
                                reportDto.ShippingFee = ordersByYears.Sum(x => x.OrderFee);

                                reports.Add(reportDto);
                            }
                        } // display by year
                        break;
                }


                return Result<List<ReportDto>>.Success(reports);
            }
        }
        
        public static int GetMonthDifference(DateTime startDate, DateTime endDate)
        {
            int monthsApart = 12 * (startDate.Year - endDate.Year) + startDate.Month - endDate.Month;
            return Math.Abs(monthsApart);
        }
    }
}