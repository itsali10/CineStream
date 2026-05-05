using MovieStreamingAPI.Application.DTOs;

namespace MovieStreamingAPI.Application.Interfaces;

public interface IWatchListService
{
    Task<IEnumerable<WatchListDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<WatchListDto>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task<WatchListDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<WatchListDto> CreateAsync(CreateWatchListDto dto, CancellationToken cancellationToken = default);
    Task<WatchListDto?> UpdateAsync(int id, UpdateWatchListDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
