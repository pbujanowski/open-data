using Duende.IdentityServer.Events;

namespace OpenData.Identity.Web.Events
{
    public class UserRegisterFailureEvent : Event
    {
        public UserRegisterFailureEvent(string email, string error)
            : base(EventCategories.Authentication, "User Register Failure", EventTypes.Failure, EventIdsEx.UserRegisterFailure, error)
        {
            Email = email;
            Error = error;
        }

        public string Email { get; set; }

        public string Error { get; set; }
    }
}