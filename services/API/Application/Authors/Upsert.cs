using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Books.Upsert;
using Application.Carts.Items;
using Application.Core;
using Application.Interface;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
namespace Application.Authors
{
    public class Upsert
    {
        public class Command : IRequest<Result<Guid>>
        {
            public Author AuthorParams { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.AuthorParams).SetValidator(new AuthorValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Guid>>
        {
            private readonly DataContext _context;
            private readonly IMediaAccessor _mediaAccessor;

            public Handler(DataContext context, IMediaAccessor mediaAccessor)
            {
                _context = context;
                _mediaAccessor = mediaAccessor;
            }
            public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {
                var author = request.AuthorParams;
                author.Media = await _context.Media.FindAsync(request.AuthorParams.Media.Id);
                if (author.Id == Guid.Empty)
                {
                    author.Id = new Guid();
                    await _context.AddAsync(author, cancellationToken);
                }
                else
                {
                    _context.Authors.Update(author);
                }
                await _context.SaveChangesAsync(cancellationToken);
                return Result<Guid>.Success(author.Id);
            }
        }
    }
}