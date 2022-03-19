using MediatR;
using OpenData.Services.NationalBank.Application.Common.Wrappers;

namespace OpenData.Services.NationalBank.Application.GoldPrices.Queries.GetGoldPricesCountByDates;

public class GetGoldPricesCountByDatesQueryHandler : IRequestHandler<GetGoldPricesCountByDatesQuery, GetGoldPricesCountByDatesQueryResponse>
{
    private readonly IRepositoryWrapper _repositories;

    public GetGoldPricesCountByDatesQueryHandler(IRepositoryWrapper repositories)
    {
        _repositories = repositories;
    }

    public async Task<GetGoldPricesCountByDatesQueryResponse> Handle(GetGoldPricesCountByDatesQuery request, CancellationToken cancellationToken)
    {
        await Task.CompletedTask;

        int count = _repositories.GoldPrices.GetCountByDates(request.StartDate, request.EndDate);
        return new GetGoldPricesCountByDatesQueryResponse(count);
    }
}