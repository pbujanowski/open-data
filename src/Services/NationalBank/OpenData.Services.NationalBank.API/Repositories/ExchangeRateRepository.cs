using Microsoft.EntityFrameworkCore;
using OpenData.Services.NationalBank.API.Entities;

namespace OpenData.Services.NationalBank.API.Repositories;

public class ExchangeRateRepository : Repository<ExchangeRate>, IExchangeRateRepository
{
    public ExchangeRateRepository(DbContext dbContext)
        : base(dbContext)
    {
    }
}