using AutoMapper;
using OpenData.Services.NationalBank.Application.Dtos;
using OpenData.Services.NationalBank.Domain.Entities;

namespace OpenData.Services.NationalBank.Application.Common.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<GoldPrice, GoldPriceDto>();
        CreateMap<GoldPriceDto, GoldPrice>();

        CreateMap<GoldPriceDto, NationalBankGoldPriceDto>();
        CreateMap<NationalBankGoldPriceDto, GoldPriceDto>();

        CreateMap<NationalBankGoldPriceDto, GoldPrice>();
        CreateMap<GoldPrice, NationalBankGoldPriceDto>();

        CreateMap<NationalBankExchangeRateDto, ExchangeRateDto>();
        CreateMap<ExchangeRateDto, NationalBankExchangeRateDto>();

        CreateMap<NationalBankExchangeRateDto, ExchangeRate>();
        CreateMap<ExchangeRate, NationalBankExchangeRateDto>();

        CreateMap<ExchangeRateDto, ExchangeRate>();
        CreateMap<ExchangeRate, ExchangeRateDto>();

        CreateMap<NationalBankExchangeRatesTableDto, ExchangeRatesTable>();
        CreateMap<ExchangeRatesTable, NationalBankExchangeRatesTableDto>();
    }
}