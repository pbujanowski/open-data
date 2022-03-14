using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.Services;

public interface IExchangeRateService
{
    Task<NationalBankExchangeRatesTableDto?> GetCurrentExchangeRatesTableAsync(string table);
}