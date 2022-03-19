using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace OpenData.Services.NationalBank.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();

        services.AddAutoMapper(assembly);
        services.AddMediatR(assembly);

        return services;
    }
}