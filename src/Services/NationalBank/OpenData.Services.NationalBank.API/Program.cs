using OpenData.Common.Extensions;
using OpenData.Services.NationalBank.Application;
using OpenData.Services.NationalBank.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureCors(builder.Configuration);
builder.Services.ConfigureAuthentication(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
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

await app.Services.AddInfrastructureForServiceProviderAsync();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();