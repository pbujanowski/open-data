using MediatR;

namespace OpenData.Services.NationalBank.API.GoldPrices.Queries.GetGoldPricesWithFilters;

public class GetGoldPricesWithFiltersQuery : IRequest<GetGoldPricesWithFiltersQueryResponse>
{
    public int PageNumber { get; }

    public int PageSize { get; }

    public DateTime StartDate { get; }

    public DateTime EndDate { get; }

    public GetGoldPricesWithFiltersQuery(int pageNumber, int pageSize, DateTime startDate, DateTime endDate)
    {
        PageNumber = pageNumber;
        PageSize = pageSize;
        StartDate = startDate;
        EndDate = endDate;
    }
}