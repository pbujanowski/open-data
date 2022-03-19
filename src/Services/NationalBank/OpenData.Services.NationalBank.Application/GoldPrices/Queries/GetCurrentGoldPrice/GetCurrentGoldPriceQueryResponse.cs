using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.GoldPrices.Queries.GetCurrentGoldPrice;

public class GetCurrentGoldPriceQueryResponse
{
    public GoldPriceDto GoldPrice { get; }

    public GetCurrentGoldPriceQueryResponse(GoldPriceDto goldPrice)
    {
        GoldPrice = goldPrice;
    }
}