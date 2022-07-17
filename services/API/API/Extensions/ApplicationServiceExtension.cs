using Application.Authors;
using Application.Core;
using Application.Interface;
using Infrastructure;
using Infrastructure.Medias;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:3000",
                        "http://localhost:3001",
                        "https://bookworm-client.herokuapp.com",
                        "https://internship-august-2021-b1566.web.app",
                        "https://bookworm-admin.herokuapp.com")
                        .AllowAnyMethod().AllowAnyHeader();
                });
            });
            services.Configure<CloudinarySetting>(configuration.GetSection("Cloudinary"));
            services.AddScoped<IMediaAccessor, MediaAccessor>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddSignalR();
            return services;
        }
    }
}