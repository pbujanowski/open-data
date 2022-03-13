using OpenData.Services.NationalBank.API.Repositories;

namespace OpenData.Services.NationalBank.API.Wrappers;

public interface IRepositoryWrapper
{
    IGoldPriceRepository GoldPrices { get; }

    void SaveChanges();

    Task SaveChangesAsync();
}