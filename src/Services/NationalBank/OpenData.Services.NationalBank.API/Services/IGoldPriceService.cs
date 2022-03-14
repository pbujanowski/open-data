using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.Services;

public interface IGoldPriceService
{
    Task<NationalBankGoldPriceDto?> GetCurrentGoldPriceAsync();

    Task<ICollection<NationalBankGoldPriceDto>> GetGoldPricesByDatesAsync(DateTime startDate, DateTime endDate);
}