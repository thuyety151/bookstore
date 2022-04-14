using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
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
        
        public class  Handler : IRequestHandler<Command,Result<Unit>>
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

                var review = request.Review;
                review.UserId = userId;
                review.CreateDate = DateTime.Now;
                ;

                _context.Reviews.Add(review);

               await _context.SaveChangesAsync();

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}