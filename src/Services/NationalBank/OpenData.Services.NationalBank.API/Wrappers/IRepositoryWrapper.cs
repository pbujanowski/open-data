using OpenData.Services.NationalBank.API.Repositories;

namespace OpenData.Services.NationalBank.API.Wrappers;

public interface IRepositoryWrapper
{
    IGoldPriceRepository GoldPrices { get; }

    IExchangeRateRepository ExchangeRates { get; }

    IExchangeRatesTableRepository ExchangeRatesTables { get; }

    void SaveChanges();

    Task SaveChangesAsync();
}