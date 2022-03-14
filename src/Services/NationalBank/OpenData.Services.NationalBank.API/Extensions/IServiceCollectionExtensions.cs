using MediatR;
using Microsoft.EntityFrameworkCore;
using OpenData.Services.NationalBank.API.Data;
using OpenData.Services.NationalBank.API.Repositories;
using OpenData.Services.NationalBank.API.Services;
using OpenData.Services.NationalBank.API.Wrappers;

namespace OpenData.Services.NationalBank.API.Extensions;

public static class IServiceCollectionExtensions
{
    public static IServiceCollection ConfigureDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<DbContext, ApplicationDbContext>(options => options.UseSqlite(connectionString));

        return services;
    }

    public static IServiceCollection ConfigureScoped(this IServiceCollection services)
    {
        services.ConfigureRepositories();
        services.ConfigureRepositoryWrapper();

        return services;
    }

    public static IServiceCollection ConfigureHttpClients(this IServiceCollection services)
    {
        services.AddHttpClient<IGoldPriceService, GoldPriceService>();
        services.AddHttpClient<IExchangeRateService, ExchangeRateService>();

        return services;
    }

    public static IServiceCollection ConfigureMiddlewares(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(Program));
        services.AddMediatR(typeof(Program));

        return services;
    }

    private static IServiceCollection ConfigureRepositories(this IServiceCollection services)
    {
        services.AddScoped<IGoldPriceRepository, GoldPriceRepository>();

        return services;
    }

    private static IServiceCollection ConfigureRepositoryWrapper(this IServiceCollection services)
    {
        services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

        return services;
    }
}