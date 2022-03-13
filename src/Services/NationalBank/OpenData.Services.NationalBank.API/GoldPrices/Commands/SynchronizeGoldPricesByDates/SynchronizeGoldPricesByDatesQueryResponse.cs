using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.GoldPrices.Commands.SynchronizeGoldPricesByDates;

public class SynchronizeGoldPricesByDatesQueryResponse
{
    public ICollection<GoldPriceDto> GoldPrices { get; }

    public SynchronizeGoldPricesByDatesQueryResponse(ICollection<GoldPriceDto> goldPrices)
    {
        GoldPrices = goldPrices;
    }
}