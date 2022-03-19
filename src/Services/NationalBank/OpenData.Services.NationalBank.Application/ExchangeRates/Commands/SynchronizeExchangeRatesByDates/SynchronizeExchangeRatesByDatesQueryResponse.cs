using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.ExchangeRates.Commands.SynchronizeExchangeRatesByDates;

public class SynchronizeExchangeRatesByDatesQueryResponse
{
    public ICollection<ExchangeRateDto> Rates { get; }

    public SynchronizeExchangeRatesByDatesQueryResponse(ICollection<ExchangeRateDto> rates)
    {
        Rates = rates;
    }
}