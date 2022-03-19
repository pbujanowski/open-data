using Microsoft.Extensions.Configuration;
using OpenData.Common.Configurations;
using OpenData.Services.NationalBank.Application.Common.Services;
using OpenData.Services.NationalBank.Application.Dtos;
using Polly;
using System.Net.Http.Json;

namespace OpenData.Services.NationalBank.Infrastructure.Services;

public class GoldPriceService : IGoldPriceService
{
    private const string baseUrl = "https://api.nbp.pl/api/cenyzlota";

    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public GoldPriceService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<NationalBankGoldPriceDto?> GetCurrentGoldPriceAsync()
    {
        return await Policy<NationalBankGoldPriceDto?>
            .Handle<HttpRequestException>()
            .RetryAsync(GetRetry())
            .ExecuteAsync(async () =>
            {
                using var response = await _httpClient.GetAsync(baseUrl);
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<ICollection<NationalBankGoldPriceDto>>();
                    return result?.FirstOrDefault();
                }
                return null;
            });
    }

    public async Task<ICollection<NationalBankGoldPriceDto>> GetGoldPricesByDatesAsync(DateTime startDate, DateTime endDate)
    {
        return await Policy<ICollection<NationalBankGoldPriceDto>>
            .Handle<HttpRequestException>()
            .RetryAsync(GetRetry())
            .ExecuteAsync(async () =>
            {
                const string dateFormat = "yyyy-MM-dd";
                string formattedStartDate = startDate.ToString(dateFormat);
                string formattedEndDate = endDate.ToString(dateFormat);

                using var response = await _httpClient.GetAsync($"{baseUrl}/{formattedStartDate}/{formattedEndDate}");
                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadFromJsonAsync<ICollection<NationalBankGoldPriceDto>>()
                        ?? new List<NationalBankGoldPriceDto>();
                }
                return new List<NationalBankGoldPriceDto>();
            });
    }

    private int GetRetry()
    {
        var pollyConfiguration = _configuration.GetRequiredSection("Polly").Get<PollyConfiguration>();
        return pollyConfiguration?.Retry ?? 0;
    }
}