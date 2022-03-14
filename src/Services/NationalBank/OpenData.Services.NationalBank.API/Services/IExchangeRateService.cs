using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.Services;

public interface IExchangeRateService
{
    Task<NationalBankExchangeRatesTableDto?> GetCurrentExchangeRatesTableAsync(string table);

    Task<ICollection<NationalBankExchangeRatesTableDto>> GetExchangeRatesTablesByDates(string table, DateTime startDate, DateTime endDate);
}