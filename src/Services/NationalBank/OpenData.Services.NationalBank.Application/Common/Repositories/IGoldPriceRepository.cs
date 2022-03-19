using OpenData.Services.NationalBank.Domain.Entities;

namespace OpenData.Services.NationalBank.Application.Common.Repositories;

public interface IGoldPriceRepository : IRepository<GoldPrice>
{
    int GetCountByDates(DateTime startDate, DateTime endDate);

    IQueryable<GoldPrice> FindByDates(DateTime startDate, DateTime endDate);

    IQueryable<GoldPrice> FindWithFilters(int pageNumber, int pageSize, DateTime startDate, DateTime endDate);
}