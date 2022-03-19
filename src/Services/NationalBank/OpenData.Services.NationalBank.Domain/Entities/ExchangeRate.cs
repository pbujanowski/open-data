using OpenData.Services.NationalBank.Domain.Common;

namespace OpenData.Services.NationalBank.Domain.Entities;

public class ExchangeRate : Entity
{
    public string? Currency { get; set; }

    public string? Code { get; set; }

    public decimal? Mid { get; set; }

    public decimal? Bid { get; set; }

    public decimal? Ask { get; set; }

    public Guid? TableId { get; set; }

    public ExchangeRatesTable? Table { get; set; }
}