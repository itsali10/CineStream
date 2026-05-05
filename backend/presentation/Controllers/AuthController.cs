using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieStreamingAPI.Application.DTOs;
using MovieStreamingAPI.Application.Interfaces;

namespace MovieStreamingAPI.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        if (!result.Success)
            return BadRequest(new { message = result.Message });

        AppendAuthCookie(result.Token!.Token, result.Token.ExpiresAtUtc);
        return Ok(new
        {
            token    = result.Token.Token,
            userId   = result.Token.UserId,
            username = result.Token.Username,
            email    = result.Token.Email,
            role     = result.Token.Role
        });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        if (!result.Success)
            return Unauthorized(new { message = result.Message });

        AppendAuthCookie(result.Token!.Token, result.Token.ExpiresAtUtc);
        return Ok(new
        {
            token    = result.Token.Token,
            userId   = result.Token.UserId,
            username = result.Token.Username,
            email    = result.Token.Email,
            role     = result.Token.Role
        });
    }

    [HttpPost("logout")]
    [AllowAnonymous]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("auth_token", new CookieOptions
        {
            SameSite = SameSiteMode.None,
            Secure   = false
        });
        return Ok(new { message = "Logged out successfully." });
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private void AppendAuthCookie(string token, DateTime expiresAt)
    {
        Response.Cookies.Append("auth_token", token, new CookieOptions
        {
            HttpOnly = true,
            Secure   = false,              // flip to true when deploying over HTTPS
            SameSite = SameSiteMode.None,  // required for cross-origin (localhost:5173 → 5202)
            Expires  = expiresAt
        });
    }
}
