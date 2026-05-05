using Microsoft.EntityFrameworkCore;
using MovieStreamingAPI.Application.DTOs;
using MovieStreamingAPI.Application.Interfaces;
using MovieStreamingAPI.Infrastructure.Persistence;
using MovieStreamingAPI.Domain.Entities;

namespace MovieStreamingAPI.Infrastructure.Services;

public sealed class DirectorService : IDirectorService
{
    private readonly AppDbContext _context;

    public DirectorService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DirectorDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Directors
            .AsNoTracking()
            .Select(d => new DirectorDto
            {
                Id = d.Id,
                FullName = d.FullName,
                Nationality = d.Nationality,
                BirthYear = d.BirthYear,
                Bio = d.Bio
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<DirectorDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Directors
            .AsNoTracking()
            .Where(d => d.Id == id)
            .Select(d => new DirectorDto
            {
                Id = d.Id,
                FullName = d.FullName,
                Nationality = d.Nationality,
                BirthYear = d.BirthYear,
                Bio = d.Bio
            })
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<DirectorDto> CreateAsync(CreateDirectorDto dto, CancellationToken cancellationToken = default)
    {
        var entity = new Director
        {
            FullName = dto.FullName,
            Nationality = dto.Nationality,
            BirthYear = dto.BirthYear,
            Bio = dto.Bio
        };

        _context.Directors.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return MapToDto(entity);
    }

    public async Task<DirectorDto?> UpdateAsync(int id, UpdateDirectorDto dto, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Directors.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return null;
        }

        entity.FullName = dto.FullName;
        entity.Nationality = dto.Nationality;
        entity.BirthYear = dto.BirthYear;
        entity.Bio = dto.Bio;

        await _context.SaveChangesAsync(cancellationToken);
        return MapToDto(entity);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Directors.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return false;
        }

        _context.Directors.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static DirectorDto MapToDto(Director entity)
    {
        return new DirectorDto
        {
            Id = entity.Id,
            FullName = entity.FullName,
            Nationality = entity.Nationality,
            BirthYear = entity.BirthYear,
            Bio = entity.Bio
        };
    }
}
