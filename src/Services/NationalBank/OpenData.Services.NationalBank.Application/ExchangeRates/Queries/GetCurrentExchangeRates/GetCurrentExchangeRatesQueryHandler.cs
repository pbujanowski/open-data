using AutoMapper;
using MediatR;
using OpenData.Services.NationalBank.Application.Common.Services;
using OpenData.Services.NationalBank.Application.Dtos;

namespace OpenData.Services.NationalBank.Application.ExchangeRates.Queries.GetCurrentExchangeRates
{
    public class GetCurrentExchangeRatesQueryHandler : IRequestHandler<GetCurrentExchangeRatesQuery, GetCurrentExchangeRatesQueryResponse>
    {
        private readonly IExchangeRateService _exchangeRateService;
        private readonly IMapper _mapper;

        public GetCurrentExchangeRatesQueryHandler(IExchangeRateService exchangeRateService, IMapper mapper)
        {
            _exchangeRateService = exchangeRateService;
            _mapper = mapper;
        }

        public async Task<GetCurrentExchangeRatesQueryResponse> Handle(GetCurrentExchangeRatesQuery request, CancellationToken cancellationToken)
        {
            var table = await _exchangeRateService.GetCurrentExchangeRatesTableAsync(request.Table);
            var mapped = _mapper.Map<ICollection<ExchangeRateDto>>(table?.Rates);
            return new GetCurrentExchangeRatesQueryResponse(mapped);
        }
    }
}