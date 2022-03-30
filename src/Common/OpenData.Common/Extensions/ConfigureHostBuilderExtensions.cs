using Microsoft.AspNetCore.Builder;
using Serilog;

namespace OpenData.Common.Extensions;

public static class ConfigureHostBuilderExtensions
{
    public static ConfigureHostBuilder ConfigureLogger(this ConfigureHostBuilder builder)
    {
        builder.UseSerilog((context, configure) =>
            configure.WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
            .Enrich.FromLogContext()
            .ReadFrom.Configuration(context.Configuration));

        return builder;
    }
}