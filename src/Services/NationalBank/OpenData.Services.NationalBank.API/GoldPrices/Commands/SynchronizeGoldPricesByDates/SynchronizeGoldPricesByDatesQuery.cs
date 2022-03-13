using MediatR;
using OpenData.Services.NationalBank.API.Dtos;

namespace OpenData.Services.NationalBank.API.GoldPrices.Commands.SynchronizeGoldPricesByDates;

public class SynchronizeGoldPricesByDatesQuery : IRequest<SynchronizeGoldPricesByDatesQueryResponse>
{
    public GoldPricesByDatesDto Parameters { get; }

    public SynchronizeGoldPricesByDatesQuery(GoldPricesByDatesDto parameters)
    {
        Parameters = parameters;
    }
}