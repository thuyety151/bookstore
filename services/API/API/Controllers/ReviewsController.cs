using System.Threading.Tasks;
using Application.Review;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReviewsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetReviews([FromQuery] ReviewParams reviewParams)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() {Params = reviewParams}));
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateReview(Review review)
        {
            return HandleResult(await Mediator.Send(new Create.Command() {Review = review}));
        }
    }
}