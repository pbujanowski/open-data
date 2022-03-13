using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.Services;

public interface INationalBankService
{
    Task<NationalBankGoldPriceDto?> GetCurrentGoldPriceAsync();

    Task<ICollection<NationalBankGoldPriceDto>> GetGoldPricesByDatesAsync(DateTime startDate, DateTime endDate);
}