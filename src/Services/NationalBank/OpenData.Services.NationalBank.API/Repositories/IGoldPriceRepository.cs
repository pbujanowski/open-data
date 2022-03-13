using OpenData.Services.NationalBank.API.Entities;

namespace OpenData.Services.NationalBank.API.Repositories;

public interface IGoldPriceRepository : IRepository<GoldPrice>
{
    int GetCountByDates(DateTime startDate, DateTime endDate);

    IQueryable<GoldPrice> FindByDates(DateTime startDate, DateTime endDate);

    IQueryable<GoldPrice> FindWithFilters(int pageNumber, int pageSize, DateTime startDate, DateTime endDate);
}