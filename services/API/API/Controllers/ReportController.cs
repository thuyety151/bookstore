using System.Threading.Tasks;
using Application.Report;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReportsController : BaseApiController
    {
        public async Task<IActionResult> GetReports([FromQuery] string range)
        {
            return HandleResult(await Mediator.Send(new List.Query() {Range = range}));
        }
    }
}