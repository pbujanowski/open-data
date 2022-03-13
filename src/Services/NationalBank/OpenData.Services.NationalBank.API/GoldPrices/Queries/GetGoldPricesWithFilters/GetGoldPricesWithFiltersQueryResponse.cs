using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.GoldPrices.Queries.GetGoldPricesWithFilters;

public class GetGoldPricesWithFiltersQueryResponse
{
    public ICollection<GoldPriceDto> GoldPrices { get; }

    public GetGoldPricesWithFiltersQueryResponse(ICollection<GoldPriceDto> goldPrices)
    {
        GoldPrices = goldPrices;
    }
}