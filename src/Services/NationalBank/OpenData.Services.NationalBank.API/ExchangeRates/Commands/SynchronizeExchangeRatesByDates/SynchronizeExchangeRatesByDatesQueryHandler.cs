using AutoMapper;
using MediatR;
using OpenData.Services.NationalBank.API.Dtos;
using OpenData.Services.NationalBank.API.Entities;
using OpenData.Services.NationalBank.API.Services;
using OpenData.Services.NationalBank.API.Wrappers;

namespace OpenData.Services.NationalBank.API.ExchangeRates.Commands.SynchronizeExchangeRatesByDates;

public class SynchronizeExchangeRatesByDatesQueryHandler : IRequestHandler<SynchronizeExchangeRatesByDatesQuery, SynchronizeExchangeRatesByDatesQueryResponse>
{
    private readonly IRepositoryWrapper _repositories;
    private readonly IExchangeRateService _exchangeRateService;
    private readonly IMapper _mapper;

    public SynchronizeExchangeRatesByDatesQueryHandler(
        IRepositoryWrapper repositories,
        IExchangeRateService exchangeRateService,
        IMapper mapper)
    {
        _repositories = repositories;
        _exchangeRateService = exchangeRateService;
        _mapper = mapper;
    }

    public async Task<SynchronizeExchangeRatesByDatesQueryResponse> Handle(SynchronizeExchangeRatesByDatesQuery request, CancellationToken cancellationToken)
    {
        var tables = await _exchangeRateService.GetExchangeRatesTablesByDates(request.Table, request.StartDate, request.EndDate);
        var tablesEntities = _mapper.Map<ICollection<ExchangeRatesTable>>(tables);
        var createdRates = new List<ExchangeRate>();

        foreach (var table in tablesEntities)
        {
            var found = _repositories.ExchangeRatesTables.FindByCondition(e => e.No == table.No).FirstOrDefault();
            if (found == null)
            {
                var createdTable = _repositories.ExchangeRatesTables.Create(table);
                if (createdTable.Rates != null)
                {
                    createdRates.AddRange(createdTable.Rates);
                }
            }
        }

        await _repositories.SaveChangesAsync();
        var mapped = _mapper.Map<ICollection<ExchangeRateDto>>(createdRates);
        return new SynchronizeExchangeRatesByDatesQueryResponse(mapped);
    }
}