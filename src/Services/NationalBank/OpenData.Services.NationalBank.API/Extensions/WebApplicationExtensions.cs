using Microsoft.EntityFrameworkCore;
using OpenData.Services.NationalBank.API.Data;

namespace OpenData.Services.NationalBank.API.Extensions
{
    public static class WebApplicationExtensions
    {
        public static async Task<WebApplication> ApplyDatabaseMigrations(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            using var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            await dbContext.Database.MigrateAsync();

            return app;
        }
    }
}