using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.Services;

public interface INationalBankService
{
    Task<NationalBankGoldPriceDto?> GetCurrentGoldPriceAsync();

    Task<ICollection<NationalBankGoldPriceDto>> GetGoldPricesByDates(DateTime startDate, DateTime endDate);
}