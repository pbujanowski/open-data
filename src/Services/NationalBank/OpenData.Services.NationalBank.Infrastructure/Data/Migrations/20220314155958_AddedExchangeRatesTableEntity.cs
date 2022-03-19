using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpenData.Services.NationalBank.API.Data.Migrations
{
    public partial class AddedExchangeRatesTableEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExchangeRatesTables",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Table = table.Column<string>(type: "TEXT", nullable: true),
                    No = table.Column<string>(type: "TEXT", nullable: true),
                    TradingDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    EffectiveDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table => table.PrimaryKey("PK_ExchangeRatesTables", x => x.Id));

            migrationBuilder.CreateTable(
                name: "ExchangeRates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Currency = table.Column<string>(type: "TEXT", nullable: true),
                    Code = table.Column<string>(type: "TEXT", nullable: true),
                    Mid = table.Column<decimal>(type: "TEXT", nullable: true),
                    Bid = table.Column<decimal>(type: "TEXT", nullable: true),
                    Ask = table.Column<decimal>(type: "TEXT", nullable: true),
                    TableId = table.Column<Guid>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExchangeRates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExchangeRates_ExchangeRatesTables_TableId",
                        column: x => x.TableId,
                        principalTable: "ExchangeRatesTables",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExchangeRates_TableId",
                table: "ExchangeRates",
                column: "TableId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExchangeRates");

            migrationBuilder.DropTable(
                name: "ExchangeRatesTables");
        }
    }
}