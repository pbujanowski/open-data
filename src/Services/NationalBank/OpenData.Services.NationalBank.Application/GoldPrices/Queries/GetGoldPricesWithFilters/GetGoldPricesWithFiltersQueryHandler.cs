using AutoMapper;
using MediatR;
using OpenData.Services.NationalBank.Application.Common.Wrappers;
using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.GoldPrices.Queries.GetGoldPricesWithFilters;

public class GetGoldPricesWithFiltersQueryHandler : IRequestHandler<GetGoldPricesWithFiltersQuery, GetGoldPricesWithFiltersQueryResponse>
{
    private readonly IRepositoryWrapper _repositories;
    private readonly IMapper _mapper;

    public GetGoldPricesWithFiltersQueryHandler(IRepositoryWrapper repositories, IMapper mapper)
    {
        _repositories = repositories;
        _mapper = mapper;
    }

    public async Task<GetGoldPricesWithFiltersQueryResponse> Handle(GetGoldPricesWithFiltersQuery request, CancellationToken cancellationToken)
    {
        await Task.CompletedTask;

        var goldPrices = _repositories.GoldPrices.FindWithFilters(
            request.PageNumber,
            request.PageSize,
            request.StartDate,
            request.EndDate)
            .ToList();

        var mapped = _mapper.Map<ICollection<GoldPriceDto>>(goldPrices);
        return new GetGoldPricesWithFiltersQueryResponse(mapped);
    }
}