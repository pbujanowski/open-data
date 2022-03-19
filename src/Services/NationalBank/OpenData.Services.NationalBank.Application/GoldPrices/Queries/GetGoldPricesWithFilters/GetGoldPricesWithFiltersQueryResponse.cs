using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.GoldPrices.Queries.GetGoldPricesWithFilters;

public class GetGoldPricesWithFiltersQueryResponse
{
    public ICollection<GoldPriceDto> GoldPrices { get; }

    public GetGoldPricesWithFiltersQueryResponse(ICollection<GoldPriceDto> goldPrices)
    {
        GoldPrices = goldPrices;
    }
}