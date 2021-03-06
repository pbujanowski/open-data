using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenData.Services.NationalBank.Domain.Entities;

namespace OpenData.Services.NationalBank.Infrastructure.Data.Configurations;

public class GoldPriceConfiguration : EntityConfiguration<GoldPrice>
{
    public override void Configure(EntityTypeBuilder<GoldPrice> builder)
    {
        base.Configure(builder);

        builder.Property(e => e.Date)
            .IsRequired();

        builder.Property(e => e.Price)
            .IsRequired();
    }
}