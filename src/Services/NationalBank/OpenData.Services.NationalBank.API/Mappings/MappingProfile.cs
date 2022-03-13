using AutoMapper;
using OpenData.Services.NationalBank.API.Dtos;
using OpenData.Services.NationalBank.API.Entities;

namespace OpenData.Services.NationalBank.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<GoldPrice, GoldPriceDto>();
        CreateMap<GoldPriceDto, GoldPrice>();

        CreateMap<GoldPriceDto, NationalBankGoldPriceDto>();
        CreateMap<NationalBankGoldPriceDto, GoldPriceDto>();

        CreateMap<NationalBankGoldPriceDto, GoldPrice>();
    }
}