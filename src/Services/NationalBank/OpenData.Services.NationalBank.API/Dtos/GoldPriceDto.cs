namespace OpenData.Services.NationalBank.API.Dtos;

public class GoldPriceDto
{
    public string? Id { get; set; }

    public DateTime? Date { get; set; }

    public decimal? Price { get; set; }
}