using OpenData.Services.NationalBank.Application.Common.Repositories;

namespace OpenData.Services.NationalBank.Application.Common.Wrappers;

public interface IRepositoryWrapper
{
    IGoldPriceRepository GoldPrices { get; }

    IExchangeRateRepository ExchangeRates { get; }

    IExchangeRatesTableRepository ExchangeRatesTables { get; }

    void SaveChanges();

    Task SaveChangesAsync();
}