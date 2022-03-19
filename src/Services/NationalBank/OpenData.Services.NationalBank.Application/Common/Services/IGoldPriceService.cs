using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.Common.Services;

public interface IGoldPriceService
{
    Task<NationalBankGoldPriceDto?> GetCurrentGoldPriceAsync();

    Task<ICollection<NationalBankGoldPriceDto>> GetGoldPricesByDatesAsync(DateTime startDate, DateTime endDate);
}