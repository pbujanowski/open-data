using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenData.Common.Configurations;
using System;

namespace OpenData.Common.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureCors(this IServiceCollection services, IConfiguration configuration)
        {
            var cors = configuration.GetRequiredSection("Cors").Get<CorsConfiguration>();
            services.AddCors(options => options.AddDefaultPolicy(policy =>
                policy.WithOrigins(cors?.Urls ?? Array.Empty<string>())
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()));

            return services;
        }
    }
}