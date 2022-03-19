using Microsoft.Extensions.Configuration;
using OpenData.Common.Configurations;
using OpenData.Services.NationalBank.Application.Common.Services;
using OpenData.Services.NationalBank.Application.Dtos;
using Polly;
using System.Net.Http.Json;

namespace OpenData.Services.NationalBank.Infrastructure.Services;

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

    public async Task<ICollection<NationalBankExchangeRatesTableDto>> GetExchangeRatesTablesByDates(string table, DateTime startDate, DateTime endDate)
    {
        return await Policy<ICollection<NationalBankExchangeRatesTableDto>>
            .Handle<HttpRequestException>()
            .RetryAsync(GetRetry())
            .ExecuteAsync(async () =>
            {
                const string dateFormat = "yyyy-MM-dd";
                string formattedStartDate = startDate.ToString(dateFormat);
                string formattedEndDate = endDate.ToString(dateFormat);

                using var response = await _httpClient.GetAsync($"{baseUrl}/{table}/{formattedStartDate}/{formattedEndDate}");
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<ICollection<NationalBankExchangeRatesTableDto>>();
                    return result ?? new List<NationalBankExchangeRatesTableDto>();
                }
                return new List<NationalBankExchangeRatesTableDto>();
            });
    }

    private int GetRetry()
    {
        var pollyConfiguration = _configuration.GetRequiredSection("Polly").Get<PollyConfiguration>();
        return pollyConfiguration.Retry;
    }
}