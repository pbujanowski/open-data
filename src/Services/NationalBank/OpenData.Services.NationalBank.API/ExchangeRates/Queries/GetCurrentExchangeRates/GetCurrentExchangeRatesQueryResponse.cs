using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.ExchangeRates.Queries.GetCurrentExchangeRates;

public class GetCurrentExchangeRatesQueryResponse
{
    public ICollection<ExchangeRateDto> Rates { get; }

    public GetCurrentExchangeRatesQueryResponse(ICollection<ExchangeRateDto> rates)
    {
        Rates = rates;
    }
}