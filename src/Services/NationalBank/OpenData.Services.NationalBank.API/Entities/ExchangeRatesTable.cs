namespace OpenData.Services.NationalBank.API.Entities;

public class ExchangeRatesTable : Entity
{
    public string? Table { get; set; }

    public string? No { get; set; }

    public DateTime? TradingDate { get; set; }

    public DateTime? EffectiveDate { get; set; }

    public ICollection<ExchangeRate>? Rates { get; set; }
}