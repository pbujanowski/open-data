using MediatR;
using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.GoldPrices.Commands.SynchronizeGoldPricesByDates;

public class SynchronizeGoldPricesByDatesQuery : IRequest<SynchronizeGoldPricesByDatesQueryResponse>
{
    public GoldPricesByDatesDto Parameters { get; }

    public SynchronizeGoldPricesByDatesQuery(GoldPricesByDatesDto parameters)
    {
        Parameters = parameters;
    }
}