using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenData.Services.NationalBank.API.Entities;

namespace OpenData.Services.NationalBank.API.Data.Configurations;

public class ExchangeRateConfiguration : EntityConfiguration<ExchangeRate>
{
    public override void Configure(EntityTypeBuilder<ExchangeRate> builder)
    {
        base.Configure(builder);

        builder.Property(e => e.Currency)
            .IsRequired();

        builder.Property(e => e.Code)
            .IsRequired();

        builder.Property(e => e.Mid);

        builder.Property(e => e.Bid);

        builder.Property(e => e.Ask);

        builder.HasOne(e => e.Table)
            .WithMany(e => e.Rates)
            .HasForeignKey(e => e.TableId)
            .IsRequired();
    }
}