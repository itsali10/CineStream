using MovieStreamingAPI.Application.DTOs;

namespace MovieStreamingAPI.Application.Interfaces;

public interface IAuthService
{
    Task<(bool Success, string Message, AuthTokenDto? Token)> RegisterAsync(RegisterDto dto);
    Task<(bool Success, string Message, AuthTokenDto? Token)> LoginAsync(LoginDto dto);
}
