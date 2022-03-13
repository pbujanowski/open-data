namespace OpenData.Services.NationalBank.API.Entities;

public class GoldPrice : Entity
{
    public DateTime Date { get; set; }

    public decimal Price { get; set; }
}