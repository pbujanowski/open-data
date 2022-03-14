namespace OpenData.Services.NationalBank.API.Constants;

public static class ExchangeRatesTableType
{
    public static string TableA => "A";

    public static string TableB => "B";

    public static string TableC => "C";

    public static ICollection<string> All => new List<string> { TableA, TableB, TableC };
}