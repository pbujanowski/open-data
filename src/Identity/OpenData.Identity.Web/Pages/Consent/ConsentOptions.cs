// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.

namespace OpenData.Identity.Web.Pages.Consent;

public static class ConsentOptions
{
    public static bool EnableOfflineAccess => true;
    public static string OfflineAccessDisplayName => "Offline Access";
    public static string OfflineAccessDescription => "Access to your applications and resources, even when you are offline";

    public static string MustChooseOneErrorMessage => "You must pick at least one permission";
    public static string InvalidSelectionErrorMessage => "Invalid selection";
}