using OpenData.Common.Extensions;
using OpenData.Services.NationalBank.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureCors(builder.Configuration);
builder.Services.ConfigureDbContext(builder.Configuration);
builder.Services.ConfigureScoped();
builder.Services.ConfigureHttpClients();
builder.Services.ConfigureMiddlewares();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

await app.ApplyDatabaseMigrations();

app.UseAuthorization();

app.MapControllers();

app.Run();