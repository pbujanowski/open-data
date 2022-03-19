using MediatR;

namespace OpenData.Services.NationalBank.Application.ExchangeRates.Queries.GetCurrentExchangeRates
{
    public class GetCurrentExchangeRatesQuery : IRequest<GetCurrentExchangeRatesQueryResponse>
    {
        public string Table { get; }

        public GetCurrentExchangeRatesQuery(string table)
        {
            Table = table;
        }
    }
}