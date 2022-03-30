using Microsoft.AspNetCore.Builder;
using Serilog;

namespace OpenData.Common.Extensions;

public static class WebApplicationExtensions
{
    public static WebApplication UseLogger(this WebApplication app)
    {
        app.UseSerilogRequestLogging();

        return app;
    }
}