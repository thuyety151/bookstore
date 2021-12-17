using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Settings;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SettingsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetSettings()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpPost]
        public async Task<IActionResult> Upsert(List<ConfigHomePageDto> configHomePage)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command(){Configs= configHomePage}));
        }
    }
}