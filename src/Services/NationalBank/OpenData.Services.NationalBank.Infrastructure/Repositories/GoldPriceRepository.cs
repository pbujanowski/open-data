using OpenData.Services.NationalBank.Application.Common.Repositories;
using OpenData.Services.NationalBank.Domain.Entities;
using OpenData.Services.NationalBank.Infrastructure.Data;

namespace OpenData.Services.NationalBank.Infrastructure.Repositories;

public class GoldPriceRepository : Repository<GoldPrice>, IGoldPriceRepository
{
    public GoldPriceRepository(ApplicationDbContext dbContext)
        : base(dbContext)
    {
    }

    public int GetCountByDates(DateTime startDate, DateTime endDate)
    {
        return FindByDates(startDate, endDate).Count();
    }

    public IQueryable<GoldPrice> FindByDates(DateTime startDate, DateTime endDate)
    {
        return FindAll().Where(e => e.Date >= startDate && e.Date <= endDate);
    }

    public IQueryable<GoldPrice> FindWithFilters(int pageNumber, int pageSize, DateTime startDate, DateTime endDate)
    {
        return FindByDates(startDate, endDate)
            .Skip(pageSize * (pageNumber - 1))
            .Take(pageSize);
    }
}