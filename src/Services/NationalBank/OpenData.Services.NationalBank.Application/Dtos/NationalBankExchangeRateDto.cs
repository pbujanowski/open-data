namespace OpenData.Services.NationalBank.Application.Dtos;

public class NationalBankExchangeRateDto
{
    public string? Currency { get; set; }

    public string? Code { get; set; }

    public decimal? Mid { get; set; }

    public decimal? Bid { get; set; }

    public decimal? Ask { get; set; }
}