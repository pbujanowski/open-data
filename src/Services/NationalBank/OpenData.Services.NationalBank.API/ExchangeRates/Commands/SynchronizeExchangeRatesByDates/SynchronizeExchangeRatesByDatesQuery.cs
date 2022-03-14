using MediatR;

namespace OpenData.Services.NationalBank.API.ExchangeRates.Commands.SynchronizeExchangeRatesByDates;

public class SynchronizeExchangeRatesByDatesQuery : IRequest<SynchronizeExchangeRatesByDatesQueryResponse>
{
    public string Table { get; }

    public DateTime StartDate { get; }

    public DateTime EndDate { get; }

    public SynchronizeExchangeRatesByDatesQuery(string table, DateTime startDate, DateTime endDate)
    {
        Table = table;
        StartDate = startDate;
        EndDate = endDate;
    }
}