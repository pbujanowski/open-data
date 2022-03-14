namespace OpenData.Services.NationalBank.API.Dtos;

public class NationalBankExchangeRatesTableDto
{
    public string? Table { get; set; }

    public string? No { get; set; }

    public DateTime? TradingDate { get; set; }

    public DateTime? EffectiveDate { get; set; }

    public ICollection<NationalBankExchangeRateDto>? Rates { get; set; }
}