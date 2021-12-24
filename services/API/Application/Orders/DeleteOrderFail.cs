using System;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class DeleteOrderFail
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IHttpContextAccessor _httpContext;
            
            public Handler(DataContext context,IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = _context.Orders.Include(x => x.Items).Where(x => x.Id.ToString() == request.Id && x.IsDeleted == false)
                    .SingleOrDefault();
                var cart = _context.Carts.Include(x => x.Items)
                    .FirstOrDefault(
                        x => x.Id == _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

               foreach (var item in order.Items)
               {
                   item.OrderId = null;
                   cart.Items.Add(item);
               }
                _context.Orders.Remove(order);
               await _context.SaveChangesAsync();
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}