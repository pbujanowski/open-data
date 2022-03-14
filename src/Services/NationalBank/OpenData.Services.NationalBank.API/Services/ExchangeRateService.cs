using OpenData.Common.Configurations;
using OpenData.Services.NationalBank.API.Dtos;
using Polly;

namespace OpenData.Services.NationalBank.API.Services;

public class ExchangeRateService : IExchangeRateService
{
    private const string baseUrl = "https://api.nbp.pl/api/exchangerates/tables";

    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public ExchangeRateService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<NationalBankExchangeRatesTableDto?> GetCurrentExchangeRatesTableAsync(string table)
    {
        return await Policy<NationalBankExchangeRatesTableDto?>
            .Handle<HttpRequestException>()
            .RetryAsync(GetRetry())
            .ExecuteAsync(async () =>
            {
                using var response = await _httpClient.GetAsync($"{baseUrl}/{table}");
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<ICollection<NationalBankExchangeRatesTableDto>>();
                    return result?.FirstOrDefault();
                }
                return null;
            });
    }

    private int GetRetry()
    {
        var pollyConfiguration = _configuration.GetRequiredSection("Polly").Get<PollyConfiguration>();
        return pollyConfiguration.Retry;
    }
}