using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using OpenData.Common.Configurations;

namespace OpenData.Common.Extensions;

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

    public static IServiceCollection ConfigureAuthentication(
        this IServiceCollection services,
        IConfiguration configuration,
        string authenticationScheme = JwtBearerDefaults.AuthenticationScheme)
    {
        var authConfiguration = configuration.GetSection("Auth").Get<AuthConfiguration>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(authenticationScheme, options =>
            {
                options.Authority = authConfiguration.Authority;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false
                };
            });

        return services;
    }
}