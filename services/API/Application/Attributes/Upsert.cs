using System;
using System.Linq;
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
                var isNameExist = _context.Attributes.Any(x => x.Name == request.AttributeParams.Name && x.IsDeleted == false && x.Id != request.AttributeParams.Id);
                if (isNameExist)
                {
                    return Result<Guid>.Failure("Name is already exist");
                }
                    
                var isSlugExist = _context.Attributes.Any(x => x.Slug == request.AttributeParams.Slug && x.IsDeleted == false && x.Id != request.AttributeParams.Id);
                if (isSlugExist)
                {
                    return Result<Guid>.Failure("Slug is already exist");
                }
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

                    if (result)
                    {
                        return Result<Guid>.Success(attribute.Id);
                    }

                    return Result<Guid>.Failure("Error when add attribute");
                }
                //Update
                else
                {
                    var attribute = _context.Attributes.FirstOrDefault(x => x.Id == request.AttributeParams.Id && x.IsDeleted == false);

                    if (attribute == null)
                    {
                        return Result<Guid>.Failure("Attribute does not exist");
                    }
                    attribute.Name = request.AttributeParams.Name;
                    attribute.Slug = request.AttributeParams.Slug;
                    
                    await _context.SaveChangesAsync();
                    return Result<Guid>.Success(attribute.Id);
                }
            }
        }
    }
}