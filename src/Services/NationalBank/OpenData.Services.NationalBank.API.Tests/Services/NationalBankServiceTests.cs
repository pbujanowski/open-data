using Microsoft.Extensions.Configuration;
using OpenData.Services.NationalBank.API.Services;
using Xunit;

namespace OpenData.Services.NationalBank.API.Tests.Services;

public class NationalBankServiceTests
{
    private readonly Dictionary<string, string> _inMemoryConfiguration = new()
    {
        { "Polly:Retry", "3" }
    };

    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly INationalBankService _nationalBankService;

    public NationalBankServiceTests()
    {
        _httpClient = new HttpClient();
        _configuration = new ConfigurationBuilder().AddInMemoryCollection(_inMemoryConfiguration).Build();
        _nationalBankService = new NationalBankService(_httpClient, _configuration);
    }

    [Fact]
    public async Task GetCurrentGoldPriceAsync()
    {
        var result = await _nationalBankService.GetCurrentGoldPriceAsync();
        Assert.NotNull(result);
    }

    [Fact]
    public async Task GetGoldPricesByDatesAsync()
    {
        var startDate = DateTime.Today.AddDays(-1);
        var endDate = DateTime.Today;
        var result = await _nationalBankService.GetGoldPricesByDatesAsync(startDate, endDate);
        Assert.NotNull(result);
    }
}