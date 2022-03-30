using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Provider.Polly;
using OpenData.Common.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureLogger();

builder.Configuration.AddJsonFile("ocelot.json");
builder.Services.ConfigureCors(builder.Configuration);
builder.Services.AddOcelot().AddPolly();

var app = builder.Build();

app.UseLogger();
app.UseCors();

await app.UseOcelot();

app.Run();