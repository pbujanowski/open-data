using Microsoft.EntityFrameworkCore;
using OpenData.Services.NationalBank.API.Entities;

namespace OpenData.Services.NationalBank.API.Repositories;

public class ExchangeRatesTableRepository : Repository<ExchangeRatesTable>, IExchangeRatesTableRepository
{
    public ExchangeRatesTableRepository(DbContext dbContext)
        : base(dbContext)
    {
    }
}