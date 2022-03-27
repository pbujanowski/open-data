using Duende.IdentityServer.Events;

namespace OpenData.Identity.Web.Events;

public class UserRegisterSuccessEvent : Event
{
    public UserRegisterSuccessEvent(string email, string subjectId)
        : base(EventCategories.Authentication, "User Register Success", EventTypes.Success, EventIdsEx.UserRegisterSuccess)
    {
        Email = email;
        SubjectId = subjectId;
    }

    public string Email { get; set; }

    public string SubjectId { get; set; }
}