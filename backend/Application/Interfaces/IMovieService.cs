using MovieStreamingAPI.Application.DTOs;

namespace MovieStreamingAPI.Application.Interfaces;

public interface IMovieService
{
    Task<IEnumerable<MovieDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<MovieDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<MovieDto> CreateAsync(CreateMovieDto dto, CancellationToken cancellationToken = default);
    Task<MovieDto?> UpdateAsync(int id, UpdateMovieDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
