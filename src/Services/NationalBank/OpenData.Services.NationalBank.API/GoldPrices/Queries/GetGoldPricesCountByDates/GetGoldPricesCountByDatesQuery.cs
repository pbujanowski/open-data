using MediatR;

namespace OpenData.Services.NationalBank.API.GoldPrices.Queries.GetGoldPricesCountByDates;

public class GetGoldPricesCountByDatesQuery : IRequest<GetGoldPricesCountByDatesQueryResponse>
{
    public DateTime StartDate { get; }

    public DateTime EndDate { get; }

    public GetGoldPricesCountByDatesQuery(DateTime startDate, DateTime endDate)
    {
        StartDate = startDate;
        EndDate = endDate;
    }
}