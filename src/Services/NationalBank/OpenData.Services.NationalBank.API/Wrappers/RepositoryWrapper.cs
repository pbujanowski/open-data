using Microsoft.EntityFrameworkCore;
using OpenData.Services.NationalBank.API.Repositories;

namespace OpenData.Services.NationalBank.API.Wrappers;

public class RepositoryWrapper : IRepositoryWrapper
{
    private readonly DbContext _dbContext;

    public IGoldPriceRepository GoldPrices { get; }

    public RepositoryWrapper(DbContext dbContext, IGoldPriceRepository goldPrices)
    {
        _dbContext = dbContext;
        GoldPrices = goldPrices;
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