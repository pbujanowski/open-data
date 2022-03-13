using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.Services;

public class NationalBankService : INationalBankService
{
    private const string baseUrl = "http://api.nbp.pl/api";

    private readonly HttpClient _httpClient;

    public NationalBankService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<NationalBankGoldPriceDto?> GetCurrentGoldPriceAsync()
    {
        using var response = await _httpClient.GetAsync($"{baseUrl}/cenyzlota");
        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content.ReadFromJsonAsync<ICollection<NationalBankGoldPriceDto>>();
            return result?.FirstOrDefault();
        }
        return null;
    }

    public async Task<ICollection<NationalBankGoldPriceDto>> GetGoldPricesByDates(DateTime startDate, DateTime endDate)
    {
        const string dateFormat = "yyyy-MM-dd";
        string formattedStartDate = startDate.ToString(dateFormat);
        string formattedEndDate = endDate.ToString(dateFormat);

        using var response = await _httpClient.GetAsync($"{baseUrl}/cenyzlota/{formattedStartDate}/{formattedEndDate}");
        if (response.IsSuccessStatusCode)
        {
            return await response.Content.ReadFromJsonAsync<ICollection<NationalBankGoldPriceDto>>()
                ?? new List<NationalBankGoldPriceDto>();
        }
        return new List<NationalBankGoldPriceDto>();
    }
}