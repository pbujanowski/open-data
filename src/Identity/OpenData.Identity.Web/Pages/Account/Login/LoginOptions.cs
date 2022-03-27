namespace OpenData.Identity.Web.Pages.Account.Login;

public static class LoginOptions
{
    public static bool AllowLocalLogin => true;
    public static bool AllowRememberLogin => true;
    public static TimeSpan RememberMeLoginDuration => TimeSpan.FromDays(30);
    public static string InvalidCredentialsErrorMessage => "Invalid email or password";
}