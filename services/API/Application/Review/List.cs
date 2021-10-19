using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Persistence;

namespace Application.Review
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ReviewDto>>>
        {
            public ReviewParams Params { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<PagedList<ReviewDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<PagedList<ReviewDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var reviews = _context.Reviews.Where(x => x.BookId == request.Params.BookId)
                    .Select(x => new ReviewDto()
                    {
                        Id = x.Id,
                        Title = x.Title,
                        Content = x.Content,
                        Rate = x.Rate,
                        CreateDate = x.CreateDate,
                        UpdateDate = x.UpdateDate,
                        Media = x.Media
                    }).AsQueryable();
                return Result<PagedList<ReviewDto>>.Success(
                    await PagedList<ReviewDto>.CreatePage(reviews, request.Params.PageIndex, request.Params.PageSize));
            }
        }
    }
}