using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenData.Services.NationalBank.API.Entities;

namespace OpenData.Services.NationalBank.API.Data.Configurations;

public class ExchangeRatesTableConfiguration : EntityConfiguration<ExchangeRatesTable>
{
    public override void Configure(EntityTypeBuilder<ExchangeRatesTable> builder)
    {
        base.Configure(builder);

        builder.Property(e => e.Table)
            .IsRequired();

        builder.Property(e => e.No)
            .IsRequired();

        builder.Property(e => e.TradingDate);

        builder.Property(e => e.EffectiveDate)
            .IsRequired();

        builder.HasMany(e => e.Rates)
            .WithOne(e => e.Table)
            .HasForeignKey(e => e.TableId)
            .IsRequired();
    }
}