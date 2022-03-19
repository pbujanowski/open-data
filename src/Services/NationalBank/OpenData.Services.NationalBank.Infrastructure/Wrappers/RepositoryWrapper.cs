using Microsoft.EntityFrameworkCore;
using OpenData.Services.NationalBank.Application.Common.Repositories;
using OpenData.Services.NationalBank.Application.Common.Wrappers;

namespace OpenData.Services.NationalBank.Infrastructure.Wrappers;

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