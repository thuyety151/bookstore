using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Medias
{
    public class Add
    {
        public class Command : IRequest<Result<Media>>
        {
            public IFormFile File { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Media>>
        {
            private readonly DataContext _context;
            private readonly IMediaAccessor _mediaAccessor;

            public Handler(DataContext context, IMediaAccessor mediaAccessor)
            {
                _context = context;
                _mediaAccessor = mediaAccessor;
            }
            public async Task<Result<Media>> Handle(Command request, CancellationToken cancellationToken)
            {
                //Add photo
                var mediaUploadResult = await _mediaAccessor.AddMedia(request.File);

                var photo = new Media()
                {
                    Id = mediaUploadResult.PublicId,
                    Url = mediaUploadResult.Url,
                };

                _context.Media.Add(photo);
                var result = await _context.SaveChangesAsync() > 0;

                if (result)
                    return Result<Media>.Success(photo);
                return Result<Media>.Failure("Error when add photo!");
            }
        }
    }
}