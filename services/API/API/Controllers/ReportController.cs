using System;
using System.Threading.Tasks;
using Application.Report;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReportsController : BaseApiController
    {
        public async Task<IActionResult> GetReports([FromQuery] string range, DateTime startDate, DateTime endDate)
        {
            return HandleResult(await Mediator.Send(new List.Query() {Range = range, StartDate = startDate, EndDate = endDate}));
        }
    }
}