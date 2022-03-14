namespace OpenData.Services.NationalBank.API.Dtos;

public class ExchangeRateDto
{
    public string? Currency { get; set; }

    public string? Code { get; set; }

    public decimal? Mid { get; set; }
}