using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.Common.Services;

public interface IExchangeRateService
{
    Task<NationalBankExchangeRatesTableDto?> GetCurrentExchangeRatesTableAsync(string table);

    Task<ICollection<NationalBankExchangeRatesTableDto>> GetExchangeRatesTablesByDates(string table, DateTime startDate, DateTime endDate);
}