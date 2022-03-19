using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenData.Services.NationalBank.Application.Common.Repositories;
using OpenData.Services.NationalBank.Application.Common.Services;
using OpenData.Services.NationalBank.Application.Common.Wrappers;
using OpenData.Services.NationalBank.Infrastructure.Data;
using OpenData.Services.NationalBank.Infrastructure.Repositories;
using OpenData.Services.NationalBank.Infrastructure.Services;
using OpenData.Services.NationalBank.Infrastructure.Wrappers;

namespace OpenData.Services.NationalBank.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureDbContext(configuration);
        services.ConfigureScoped();
        services.ConfigureHttpClients();
        services.ConfigureRepositories();
        services.ConfigureRepositoryWrapper();

        return services;
    }

    public static async Task<IServiceProvider> AddInfrastructureForServiceProviderAsync(this IServiceProvider services)
    {
        await ApplyDatabaseMigrationsAsync(services);

        return services;
    }

    private static async Task<IServiceProvider> ApplyDatabaseMigrationsAsync(this IServiceProvider services)
    {
        using var scope = services.CreateScope();
        using var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await dbContext.Database.MigrateAsync();
        return services;
    }

    private static IServiceCollection ConfigureDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<DbContext, ApplicationDbContext>(options => options.UseSqlite(connectionString));

        return services;
    }

    private static IServiceCollection ConfigureScoped(this IServiceCollection services)
    {
        services.ConfigureRepositories();
        services.ConfigureRepositoryWrapper();

        return services;
    }

    private static IServiceCollection ConfigureHttpClients(this IServiceCollection services)
    {
        services.AddHttpClient<IGoldPriceService, GoldPriceService>();
        services.AddHttpClient<IExchangeRateService, ExchangeRateService>();

        return services;
    }

    private static IServiceCollection ConfigureRepositories(this IServiceCollection services)
    {
        services.AddScoped<IGoldPriceRepository, GoldPriceRepository>();
        services.AddScoped<IExchangeRateRepository, ExchangeRateRepository>();
        services.AddScoped<IExchangeRatesTableRepository, ExchangeRatesTableRepository>();

        return services;
    }

    private static IServiceCollection ConfigureRepositoryWrapper(this IServiceCollection services)
    {
        services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

        return services;
    }
}