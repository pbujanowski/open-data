using MediatR;

namespace OpenData.Services.NationalBank.API.ExchangeRates.Queries.GetCurrentExchangeRates
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