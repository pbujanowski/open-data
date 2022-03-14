using Microsoft.EntityFrameworkCore;
using OpenData.Services.NationalBank.API.Repositories;

namespace OpenData.Services.NationalBank.API.Wrappers;

public class RepositoryWrapper : IRepositoryWrapper
{
    private readonly DbContext _dbContext;

    public IGoldPriceRepository GoldPrices { get; }

    public IExchangeRateRepository ExchangeRates { get; }

    public IExchangeRatesTableRepository ExchangeRatesTables { get; }

    public RepositoryWrapper(
        DbContext dbContext,
        IGoldPriceRepository goldPrices,
        IExchangeRateRepository exchangeRates,
        IExchangeRatesTableRepository exchangeRatesTables)
    {
        _dbContext = dbContext;
        GoldPrices = goldPrices;
        ExchangeRates = exchangeRates;
        ExchangeRatesTables = exchangeRatesTables;
    }

    public void SaveChanges()
    {
        _dbContext.SaveChanges();
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}