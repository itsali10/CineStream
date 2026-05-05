using MovieStreamingAPI.Application.DTOs;

namespace MovieStreamingAPI.Application.Interfaces;

public interface IDirectorService
{
    Task<IEnumerable<DirectorDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<DirectorDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<DirectorDto> CreateAsync(CreateDirectorDto dto, CancellationToken cancellationToken = default);
    Task<DirectorDto?> UpdateAsync(int id, UpdateDirectorDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
