using OpenData.Services.NationalBank.Domain.Common;

namespace OpenData.Services.NationalBank.Domain.Entities;

public class GoldPrice : Entity
{
    public DateTime Date { get; set; }

    public decimal Price { get; set; }
}