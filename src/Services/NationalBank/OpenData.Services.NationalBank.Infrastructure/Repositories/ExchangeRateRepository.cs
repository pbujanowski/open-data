using Microsoft.EntityFrameworkCore;
using OpenData.Services.NationalBank.Application.Common.Repositories;
using OpenData.Services.NationalBank.Domain.Entities;

namespace OpenData.Services.NationalBank.Infrastructure.Repositories;

public class ExchangeRateRepository : Repository<ExchangeRate>, IExchangeRateRepository
{
    public ExchangeRateRepository(DbContext dbContext)
        : base(dbContext)
    {
    }
}