using System.ComponentModel.DataAnnotations;

namespace OpenData.Identity.Web.Pages.Account.Register
{
    public class InputModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required]
        [Compare(nameof(Password), ErrorMessage = "Passwords did not match")]
        [Display(Name = "Confirm password")]
        public string ConfirmPassword { get; set; }

        public string ReturnUrl { get; set; }

        public string Button { get; set; }
    }
}