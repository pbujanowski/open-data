using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.ExchangeRates.Commands.SynchronizeExchangeRatesByDates;

public class SynchronizeExchangeRatesByDatesQueryResponse
{
    public ICollection<ExchangeRateDto> Rates { get; }

    public SynchronizeExchangeRatesByDatesQueryResponse(ICollection<ExchangeRateDto> rates)
    {
        Rates = rates;
    }
}