using Microsoft.EntityFrameworkCore;
using MovieStreamingAPI.Application.DTOs;
using MovieStreamingAPI.Application.Interfaces;
using MovieStreamingAPI.Infrastructure.Persistence;
using MovieStreamingAPI.Domain.Entities;

namespace MovieStreamingAPI.Infrastructure.Services;

public sealed class WatchListService : IWatchListService
{
    private readonly AppDbContext _context;

    public WatchListService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<WatchListDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.WatchLists
            .AsNoTracking()
            .OrderByDescending(w => w.AddedAt)
            .Select(w => new WatchListDto
            {
                Id = w.Id,
                AddedAt = w.AddedAt,
                IsWatched = w.IsWatched,
                UserId = w.UserId,
                MovieId = w.MovieId,
                Movie = w.Movie == null ? null : new MovieDto
                {
                    Id = w.Movie.Id,
                    Title = w.Movie.Title,
                    Genre = w.Movie.Genre,
                    ReleaseYear = w.Movie.ReleaseYear,
                    DurationMinutes = w.Movie.DurationMinutes,
                    Rating = w.Movie.Rating,
                    ThumbnailUrl = w.Movie.ThumbnailUrl,
                    DirectorId = w.Movie.DirectorId,
                    Description = w.Movie.Description
                }
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<WatchListDto>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default)
    {
        return await _context.WatchLists
            .AsNoTracking()
            .Where(w => w.UserId == userId)
            .OrderByDescending(w => w.AddedAt)
            .Select(w => new WatchListDto
            {
                Id = w.Id,
                AddedAt = w.AddedAt,
                IsWatched = w.IsWatched,
                UserId = w.UserId,
                MovieId = w.MovieId,
                Movie = w.Movie == null ? null : new MovieDto
                {
                    Id = w.Movie.Id,
                    Title = w.Movie.Title,
                    Genre = w.Movie.Genre,
                    ReleaseYear = w.Movie.ReleaseYear,
                    DurationMinutes = w.Movie.DurationMinutes,
                    Rating = w.Movie.Rating,
                    ThumbnailUrl = w.Movie.ThumbnailUrl,
                    DirectorId = w.Movie.DirectorId,
                    Description = w.Movie.Description
                }
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<WatchListDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.WatchLists
            .AsNoTracking()
            .Where(w => w.Id == id)
            .Select(w => new WatchListDto
            {
                Id = w.Id,
                AddedAt = w.AddedAt,
                IsWatched = w.IsWatched,
                UserId = w.UserId,
                MovieId = w.MovieId,
                Movie = w.Movie == null ? null : new MovieDto
                {
                    Id = w.Movie.Id,
                    Title = w.Movie.Title,
                    Genre = w.Movie.Genre,
                    ReleaseYear = w.Movie.ReleaseYear,
                    DurationMinutes = w.Movie.DurationMinutes,
                    Rating = w.Movie.Rating,
                    ThumbnailUrl = w.Movie.ThumbnailUrl,
                    DirectorId = w.Movie.DirectorId,
                    Description = w.Movie.Description
                }
            })
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<WatchListDto> CreateAsync(CreateWatchListDto dto, CancellationToken cancellationToken = default)
    {
        var entity = new WatchList
        {
            IsWatched = dto.IsWatched,
            UserId = dto.UserId,
            MovieId = dto.MovieId,
            AddedAt = DateTime.UtcNow
        };

        _context.WatchLists.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        // Re-fetch with movie so the response includes it
        return await GetByIdAsync(entity.Id, cancellationToken) ?? MapToDto(entity);
    }

    public async Task<WatchListDto?> UpdateAsync(int id, UpdateWatchListDto dto, CancellationToken cancellationToken = default)
    {
        var entity = await _context.WatchLists.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return null;
        }

        entity.IsWatched = dto.IsWatched;
        await _context.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(id, cancellationToken);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var entity = await _context.WatchLists.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return false;
        }

        _context.WatchLists.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static WatchListDto MapToDto(WatchList entity)
    {
        return new WatchListDto
        {
            Id = entity.Id,
            AddedAt = entity.AddedAt,
            IsWatched = entity.IsWatched,
            UserId = entity.UserId,
            MovieId = entity.MovieId
        };
    }
}
