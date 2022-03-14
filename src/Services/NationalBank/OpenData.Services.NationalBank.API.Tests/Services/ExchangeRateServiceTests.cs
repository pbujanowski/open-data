using Microsoft.Extensions.Configuration;
using OpenData.Services.NationalBank.API.Constants;
using OpenData.Services.NationalBank.API.Services;
using Xunit;

namespace OpenData.Services.NationalBank.API.Tests.Services;

public class ExchangeRateServiceTests
{
    private readonly Dictionary<string, string> _inMemoryConfiguration = new()
    {
        { "Polly:Retry", "3" }
    };

    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly IExchangeRateService _exchangeRateService;

    public ExchangeRateServiceTests()
    {
        _httpClient = new HttpClient();
        _configuration = new ConfigurationBuilder().AddInMemoryCollection(_inMemoryConfiguration).Build();
        _exchangeRateService = new ExchangeRateService(_httpClient, _configuration);
    }

    [Fact]
    public async Task GetCurrentExchangeRateTableAsync()
    {
        foreach (var table in ExchangeRatesTableType.All)
        {
            var result = await _exchangeRateService.GetCurrentExchangeRatesTableAsync(table);
            Assert.NotNull(result);
        }
    }
}