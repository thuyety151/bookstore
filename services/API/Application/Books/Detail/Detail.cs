using System;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enum;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books.Detail
{
    public class Detail
    {
        public class Query : IRequest<Result<BookDetailDto>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<BookDetailDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(DataContext context, IMapper mapper,IHttpContextAccessor httpContextAccessor)
            {
                _context = context;
                _mapper = mapper;
                _httpContextAccessor = httpContextAccessor;
            }
            public async Task<Result<BookDetailDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bookDetailDto = await  _context.Books.Include(x => x.Author)
                                            .Include(x => x.Language)
                                            .Include(x => x.Attributes).ThenInclude(x => x.Attribute)
                                            .Include(x => x.Categories)
                                            .Where(x => x.IsDeleted == false)
                                            .ProjectTo<BookDetailDto>(_mapper.ConfigurationProvider)
                                            .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (bookDetailDto == null)
                {
                    return Result<BookDetailDto>.Failure("Book is not exist");
                }
                bookDetailDto.TotalStock = bookDetailDto.Attributes.Sum(x => x.TotalStock);
                bookDetailDto.StockStatus = bookDetailDto.TotalStock > 0
                    ? StockStatus.InStock.ToString()
                    : StockStatus.OutOfStock.ToString();
                var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId != null)
                {
                    // check permission
                    bool canReviewitems = _context.Orders.Include(x => x.Items).Any(x =>
                        x.Items.Any(i => i.ProductId == request.Id && x.UserId.ToString() == userId && i.IsReviewed==false));

                    bookDetailDto.CanReview = canReviewitems;
                }
                return Result<BookDetailDto>.Success(bookDetailDto);
            }
        }
    }
}