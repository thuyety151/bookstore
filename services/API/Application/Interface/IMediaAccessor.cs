using System.Threading.Tasks;
using Application.Medias;
using Microsoft.AspNetCore.Http;

namespace Application.Interface
{
    public interface IMediaAccessor
    {
        Task<MediaUploadResult> AddMedia(IFormFile file);
        Task<string> DeleteMedia(string publicId);
    }
}