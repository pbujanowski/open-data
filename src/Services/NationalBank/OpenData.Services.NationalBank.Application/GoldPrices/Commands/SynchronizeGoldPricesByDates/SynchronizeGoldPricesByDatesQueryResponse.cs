using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.GoldPrices.Commands.SynchronizeGoldPricesByDates;

public class SynchronizeGoldPricesByDatesQueryResponse
{
    public ICollection<GoldPriceDto> GoldPrices { get; }

    public SynchronizeGoldPricesByDatesQueryResponse(ICollection<GoldPriceDto> goldPrices)
    {
        GoldPrices = goldPrices;
    }
}