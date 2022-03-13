using AutoMapper;
using MediatR;
using OpenData.Services.NationalBank.API.Dtos;
using OpenData.Services.NationalBank.API.Services;

namespace OpenData.Services.NationalBank.API.GoldPrices.Queries.GetCurrentGoldPrice;

public class GetCurrentGoldPriceQueryHandler : IRequestHandler<GetCurrentGoldPriceQuery, GetCurrentGoldPriceQueryResponse>
{
    private readonly INationalBankService _nationalBankService;
    private readonly IMapper _mapper;

    public GetCurrentGoldPriceQueryHandler(INationalBankService nationalBankService, IMapper mapper)
    {
        _nationalBankService = nationalBankService;
        _mapper = mapper;
    }

    public async Task<GetCurrentGoldPriceQueryResponse> Handle(GetCurrentGoldPriceQuery request, CancellationToken cancellationToken)
    {
        var goldPrice = await _nationalBankService.GetCurrentGoldPriceAsync();
        var mapped = _mapper.Map<GoldPriceDto>(goldPrice);
        return new GetCurrentGoldPriceQueryResponse(mapped);
    }
}