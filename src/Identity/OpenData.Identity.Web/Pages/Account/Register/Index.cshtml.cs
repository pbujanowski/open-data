using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OpenData.Identity.Web.Events;
using OpenData.Identity.Web.Models;

namespace OpenData.Identity.Web.Pages.Account.Register;

[SecurityHeaders]
[AllowAnonymous]
public class Index : PageModel
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IEventService _events;

    [BindProperty]
    public InputModel Input { get; set; }

    public Index(IEventService events, UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
        _events = events;
    }

    public async Task<IActionResult> OnGet(string returnUrl)
    {
        await BuildModelAsync(returnUrl);

        return Page();
    }

    public async Task<IActionResult> OnPost()
    {
        // the user clicked the "cancel" button
        if (Input.Button != "register")
        {
            if (string.IsNullOrEmpty(Input.ReturnUrl))
            {
                return Redirect("~/");
            }
            else
            {
                return Redirect(Input.ReturnUrl);
            }
        }

        if (ModelState.IsValid)
        {
            var result = await _userManager.FindByEmailAsync(Input.Email);
            if (result == null)
            {
                var userToCreate = new ApplicationUser
                {
                    UserName = Input.Email,
                    Email = Input.Email
                };

                var identityResult = await _userManager.CreateAsync(userToCreate, Input.Password);
                if (identityResult.Succeeded)
                {
                    var createdUser = await _userManager.FindByEmailAsync(Input.Email);
                    await _events.RaiseAsync(new UserRegisterSuccessEvent(createdUser.Email, createdUser.Id));

                    if (string.IsNullOrEmpty(Input.ReturnUrl))
                    {
                        return Redirect("~/");
                    }
                    else
                    {
                        return Redirect(Input.ReturnUrl);
                    }
                }
                else
                {
                    ModelState.AddModelError(string.Empty, identityResult.Errors.FirstOrDefault().Description);
                }
            }
            else
            {
                await _events.RaiseAsync(new UserRegisterFailureEvent(Input.Email, "User already exists"));
                ModelState.AddModelError(string.Empty, RegisterOptions.UserAlreadyExistsErrorMessage);
            }
        }

        // something went wrong, show form with error
        await BuildModelAsync(Input.ReturnUrl);
        return Page();
    }

    private async Task BuildModelAsync(string returnUrl)
    {
        Input = new InputModel
        {
            ReturnUrl = returnUrl
        };

        await Task.CompletedTask;
    }
}