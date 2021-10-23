using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
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