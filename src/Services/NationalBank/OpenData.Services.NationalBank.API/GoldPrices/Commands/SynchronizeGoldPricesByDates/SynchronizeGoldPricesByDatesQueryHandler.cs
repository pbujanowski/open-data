using AutoMapper;
using MediatR;
using OpenData.Services.NationalBank.API.Dtos;
using OpenData.Services.NationalBank.API.Entities;
using OpenData.Services.NationalBank.API.Services;
using OpenData.Services.NationalBank.API.Wrappers;

namespace OpenData.Services.NationalBank.API.GoldPrices.Commands.SynchronizeGoldPricesByDates;

public class SynchronizeGoldPricesByDatesQueryHandler : IRequestHandler<SynchronizeGoldPricesByDatesQuery, SynchronizeGoldPricesByDatesQueryResponse>
{
    private readonly IRepositoryWrapper _repositories;
    private readonly INationalBankService _nationalBankService;
    private readonly IMapper _mapper;

    public SynchronizeGoldPricesByDatesQueryHandler(
        IRepositoryWrapper repositories,
        INationalBankService nationalBankService,
        IMapper mapper)
    {
        _repositories = repositories;
        _nationalBankService = nationalBankService;
        _mapper = mapper;
    }

    public async Task<SynchronizeGoldPricesByDatesQueryResponse> Handle(SynchronizeGoldPricesByDatesQuery request, CancellationToken cancellationToken)
    {
        var fetched = await _nationalBankService.GetGoldPricesByDates(request.Parameters.StartDate, request.Parameters.EndDate);
        var entities = _mapper.Map<ICollection<GoldPrice>>(fetched);
        var created = new List<GoldPrice>();

        foreach (var entity in entities)
        {
            var createdEntity = _repositories.GoldPrices.Create(entity);
            created.Add(createdEntity);
        }

        await _repositories.SaveChangesAsync();

        var mapped = _mapper.Map<ICollection<GoldPriceDto>>(created);
        return new SynchronizeGoldPricesByDatesQueryResponse(mapped);
    }
}