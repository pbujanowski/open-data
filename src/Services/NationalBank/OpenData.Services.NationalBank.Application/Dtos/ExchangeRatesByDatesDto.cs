namespace OpenData.Services.NationalBank.Application.Dtos;

public class ExchangeRatesByDatesDto
{
    public string? Table { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
}