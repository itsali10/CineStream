using Microsoft.EntityFrameworkCore;
using MovieStreamingAPI.Application.DTOs;
using MovieStreamingAPI.Application.Interfaces;
using MovieStreamingAPI.Infrastructure.Persistence;
using MovieStreamingAPI.Domain.Entities;

namespace MovieStreamingAPI.Infrastructure.Services;

public sealed class MovieService : IMovieService
{
    private readonly AppDbContext _context;

    public MovieService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MovieDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Movies
            .AsNoTracking()
            .Select(m => new MovieDto
            {
                Id = m.Id,
                Title = m.Title,
                Description = m.Description,
                Genre = m.Genre,
                ReleaseYear = m.ReleaseYear,
                DurationMinutes = m.DurationMinutes,
                Rating = m.Rating,
                ThumbnailUrl = m.ThumbnailUrl,
                DirectorId = m.DirectorId
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<MovieDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Movies
            .AsNoTracking()
            .Where(m => m.Id == id)
            .Select(m => new MovieDto
            {
                Id = m.Id,
                Title = m.Title,
                Description = m.Description,
                Genre = m.Genre,
                ReleaseYear = m.ReleaseYear,
                DurationMinutes = m.DurationMinutes,
                Rating = m.Rating,
                ThumbnailUrl = m.ThumbnailUrl,
                DirectorId = m.DirectorId
            })
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<MovieDto> CreateAsync(CreateMovieDto dto, CancellationToken cancellationToken = default)
    {
        var entity = new Movie
        {
            Title = dto.Title,
            Description = dto.Description,
            Genre = dto.Genre,
            ReleaseYear = dto.ReleaseYear,
            DurationMinutes = dto.DurationMinutes,
            Rating = dto.Rating,
            ThumbnailUrl = dto.ThumbnailUrl,
            DirectorId = dto.DirectorId
        };

        _context.Movies.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return MapToDto(entity);
    }

    public async Task<MovieDto?> UpdateAsync(int id, UpdateMovieDto dto, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Movies.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return null;
        }

        entity.Title = dto.Title;
        entity.Description = dto.Description;
        entity.Genre = dto.Genre;
        entity.ReleaseYear = dto.ReleaseYear;
        entity.DurationMinutes = dto.DurationMinutes;
        entity.Rating = dto.Rating;
        entity.ThumbnailUrl = dto.ThumbnailUrl;
        entity.DirectorId = dto.DirectorId;

        await _context.SaveChangesAsync(cancellationToken);
        return MapToDto(entity);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Movies.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return false;
        }

        _context.Movies.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static MovieDto MapToDto(Movie entity)
    {
        return new MovieDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            Genre = entity.Genre,
            ReleaseYear = entity.ReleaseYear,
            DurationMinutes = entity.DurationMinutes,
            Rating = entity.Rating,
            ThumbnailUrl = entity.ThumbnailUrl,
            DirectorId = entity.DirectorId
        };
    }
}
