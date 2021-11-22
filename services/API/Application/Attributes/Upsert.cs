using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Attributes
{
    public class Upsert
    {
        public class Command : IRequest<Result<Guid>>
        {
            public AttributeParams AttributeParams { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.AttributeParams).SetValidator(new AttributeValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Guid>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Add
                if (request.AttributeParams.Id == Guid.Empty)
                {
                    var attribute = new Domain.Attribute()
                    {
                        Id = request.AttributeParams.Id,
                        Name = request.AttributeParams.Name,
                        Slug = request.AttributeParams.Slug,
                        IsDeleted = false
                    };

                    await _context.Attributes.AddAsync(attribute);

                    var result = await _context.SaveChangesAsync() > 0;
                    
                    if(result) return Result<Guid>.Success(attribute.Id);
                    
                    return Result<Guid>.Failure("Error when add attribute");
                }
                return Result<Guid>.Failure("Error when add attribute");
            }
        }
    }
}