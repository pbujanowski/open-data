namespace OpenData.Services.NationalBank.API.GoldPrices.Queries.GetGoldPricesCountByDates;

public class GetGoldPricesCountByDatesQueryResponse
{
    public int Count { get; }

    public GetGoldPricesCountByDatesQueryResponse(int count)
    {
        Count = count;
    }
}