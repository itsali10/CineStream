using MovieStreamingAPI.Application.DTOs;

namespace MovieStreamingAPI.Application.Interfaces;

public interface IUserProfileService
{
    Task<IEnumerable<UserProfileDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<UserProfileDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<UserProfileDto> CreateAsync(CreateUserProfileDto dto, CancellationToken cancellationToken = default);
    Task<UserProfileDto?> UpdateAsync(int id, UpdateUserProfileDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
