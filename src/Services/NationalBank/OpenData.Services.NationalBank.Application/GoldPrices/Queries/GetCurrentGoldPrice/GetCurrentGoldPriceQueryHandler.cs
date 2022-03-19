using AutoMapper;
using MediatR;
using OpenData.Services.NationalBank.Application.Common.Services;
using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.GoldPrices.Queries.GetCurrentGoldPrice;

public class GetCurrentGoldPriceQueryHandler : IRequestHandler<GetCurrentGoldPriceQuery, GetCurrentGoldPriceQueryResponse>
{
    private readonly IGoldPriceService _goldPriceService;
    private readonly IMapper _mapper;

    public GetCurrentGoldPriceQueryHandler(IGoldPriceService goldPriceService, IMapper mapper)
    {
        _goldPriceService = goldPriceService;
        _mapper = mapper;
    }

    public async Task<GetCurrentGoldPriceQueryResponse> Handle(GetCurrentGoldPriceQuery request, CancellationToken cancellationToken)
    {
        var goldPrice = await _goldPriceService.GetCurrentGoldPriceAsync();
        var mapped = _mapper.Map<GoldPriceDto>(goldPrice);
        return new GetCurrentGoldPriceQueryResponse(mapped);
    }
}