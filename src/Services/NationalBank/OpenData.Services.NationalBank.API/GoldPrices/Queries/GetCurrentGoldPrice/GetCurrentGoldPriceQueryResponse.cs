using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.GoldPrices.Queries.GetCurrentGoldPrice;

public class GetCurrentGoldPriceQueryResponse
{
    public GoldPriceDto GoldPrice { get; }

    public GetCurrentGoldPriceQueryResponse(GoldPriceDto goldPrice)
    {
        GoldPrice = goldPrice;
    }
}