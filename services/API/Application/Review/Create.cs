using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Review
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Review Review { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(DataContext context, IHttpContextAccessor httpContextAccessor)
            {
                _context = context;
                _httpContextAccessor = httpContextAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                bool isHasPermissionToReview = _context.Orders.Include(x => x.Items).Any(x =>
                    x.Items.Any(i => i.ProductId == request.Review.BookId && x.UserId.ToString() == userId));

                if (!isHasPermissionToReview)
                {
                    return Result<Unit>.Failure("Unauthorized");
                }
                var medias = request.Review.Media;
                var review = request.Review;
                review.UserId = userId;
                review.CreateDate = DateTime.Now;
                review.Media = new List<Media>();

                // Update status in Items;
                var item = _context.Orders
                    .Include(x => x.Items).Where(x => x.UserId.ToString() == userId)
                    .SelectMany(x => x.Items).FirstOrDefault(x => x.ProductId == request.Review.BookId && x.IsReviewed == false);

                if (item != null) item.IsReviewed = true;

                if (medias.Any())
                {
                    foreach (var media in medias.ToList())
                    {
                        var photo = _context.Media.FirstOrDefault(
                            x => x.Id == media.Id);
                        if (photo != null)
                        {
                            review.Media.Add(photo);
                        }
                    }
                }
                _context.Reviews.Add(review);
                await _context.SaveChangesAsync();

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}