using System.Text.Json.Serialization;

namespace OpenData.Services.NationalBank.Application.Dtos;

public class NationalBankGoldPriceDto
{
    [JsonPropertyName("data")]
    public DateTime Date { get; set; }

    [JsonPropertyName("cena")]
    public decimal Price { get; set; }
}