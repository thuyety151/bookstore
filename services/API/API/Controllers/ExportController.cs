using System.Threading.Tasks;
using Application.Export;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ExportController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> ExportData()
        {
            var result = await Mediator.Send(new Export.Query(){});
            return File(result.Value.Bytes, "application/octet-stream", result.Value.FileName);
        }
    }
}