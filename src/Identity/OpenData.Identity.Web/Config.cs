using Duende.IdentityServer.Models;

namespace OpenData.Identity.Web;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Email(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("open-data-api"),
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            // interactive client using code flow + pkce
            new Client
            {
                ClientId = "open-data-client",
                ClientName = "Open Data Client",

                AllowedGrantTypes = GrantTypes.Code,
                RequireClientSecret = false,

                RedirectUris = { "http://localhost:3000/login-callback" },
                FrontChannelLogoutUri = "http://localhost:3000/logout-callback",
                PostLogoutRedirectUris = { "http://localhost:3000/logout-callback" },

                AllowOfflineAccess = true,
                AllowedScopes = { "openid", "profile", "email", "open-data-api" }
            },
        };
}
