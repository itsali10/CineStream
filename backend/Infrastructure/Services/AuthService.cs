using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MovieStreamingAPI.Application.DTOs;
using MovieStreamingAPI.Application.Interfaces;
using MovieStreamingAPI.Infrastructure.Persistence;
using MovieStreamingAPI.Domain.Entities;

namespace MovieStreamingAPI.Infrastructure.Services;

public sealed class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AuthService(
        AppDbContext context,
        IConfiguration configuration,
        IPasswordHasher<User> passwordHasher)
    {
        _context = context;
        _configuration = configuration;
        _passwordHasher = passwordHasher;
    }

    public async Task<(bool Success, string Message, AuthTokenDto? Token)> RegisterAsync(RegisterDto dto)
    {
        var exists = await _context.Users
            .AsNoTracking()
            .AnyAsync(u => u.Email == dto.Email);
        if (exists)
        {
            return (false, "Email is already registered.", null);
        }

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            Role = NormalizeRole(dto.Role),
            CreatedAt = DateTime.UtcNow
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, dto.PasswordHash);

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = GenerateToken(user);
        return (true, "Registered successfully.", token);
    }

    public async Task<(bool Success, string Message, AuthTokenDto? Token)> LoginAsync(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user is null)
        {
            return (false, "Invalid email or password.", null);
        }

        PasswordVerificationResult verifyResult;
        try
        {
            verifyResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.PasswordHash);
        }
        catch (FormatException)
        {
            // Existing records may still contain plain-text passwords from before hashing was introduced.
            verifyResult = PasswordVerificationResult.Failed;
        }

        if (verifyResult == PasswordVerificationResult.Failed)
        {
            // Backward compatibility for existing plain-text values already in DB.
            if (user.PasswordHash != dto.PasswordHash)
            {
                return (false, "Invalid email or password.", null);
            }

            user.PasswordHash = _passwordHasher.HashPassword(user, dto.PasswordHash);
            await _context.SaveChangesAsync();
        }
        else if (verifyResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.PasswordHash = _passwordHasher.HashPassword(user, dto.PasswordHash);
            await _context.SaveChangesAsync();
        }

        var token = GenerateToken(user);
        return (true, "Login successful.", token);
    }

    private static string NormalizeRole(string role)
    {
        if (string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase))
        {
            return "Admin";
        }

        return "User";
    }

    private AuthTokenDto GenerateToken(User user)
    {
        var key = _configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("JWT key is missing.");
        var issuer = _configuration["Jwt:Issuer"] ?? "MovieStreamingAPI";
        var audience = _configuration["Jwt:Audience"] ?? "MovieStreamingAPI.Client";
        var expiryMinutes = int.TryParse(_configuration["Jwt:ExpiryMinutes"], out var minutes)
            ? minutes
            : 60;

        var expiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256);

        var jwtToken = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials);

        return new AuthTokenDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
            ExpiresAtUtc = expiresAt,
            UserId = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role
        };
    }
}
