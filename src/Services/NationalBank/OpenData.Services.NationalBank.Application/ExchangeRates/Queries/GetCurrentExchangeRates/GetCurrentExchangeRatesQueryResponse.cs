using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.ExchangeRates.Queries.GetCurrentExchangeRates;

public class GetCurrentExchangeRatesQueryResponse
{
    public ICollection<ExchangeRateDto> Rates { get; }

    public GetCurrentExchangeRatesQueryResponse(ICollection<ExchangeRateDto> rates)
    {
        Rates = rates;
    }
}