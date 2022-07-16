using System;
using System.Threading.Tasks;
using Application.Interface;
using Application.Medias;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Medias
{
    public class MediaAccessor : IMediaAccessor
    {
        private readonly Cloudinary _cloudinary;

        public MediaAccessor(IOptions<CloudinarySetting> config)
        {
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<MediaUploadResult> AddMedia(IFormFile file)
        {
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream)
                };

                var uploadResult = await _cloudinary.UploadAsync("auto", null,
                    new FileDescription(file.FileName, stream));

                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }
                else
                {
                    return new MediaUploadResult()
                    {
                        PublicId = uploadResult.PublicId,
                        Url = uploadResult.SecureUrl.ToString()
                    };
                }
            }
            return null;
        }

        public async Task<string> DeleteMedia(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result.Result == "ok" ? result.Result : null;
        }
    }
}