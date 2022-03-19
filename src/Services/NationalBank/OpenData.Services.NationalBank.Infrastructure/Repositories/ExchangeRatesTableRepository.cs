using Microsoft.EntityFrameworkCore;
using OpenData.Services.NationalBank.Application.Common.Repositories;
using OpenData.Services.NationalBank.Domain.Entities;

namespace OpenData.Services.NationalBank.Infrastructure.Repositories;

public class ExchangeRatesTableRepository : Repository<ExchangeRatesTable>, IExchangeRatesTableRepository
{
    public ExchangeRatesTableRepository(DbContext dbContext)
        : base(dbContext)
    {
    }
}