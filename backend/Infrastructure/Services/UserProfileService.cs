using Microsoft.EntityFrameworkCore;
using MovieStreamingAPI.Application.DTOs;
using MovieStreamingAPI.Application.Interfaces;
using MovieStreamingAPI.Infrastructure.Persistence;
using MovieStreamingAPI.Domain.Entities;

namespace MovieStreamingAPI.Infrastructure.Services;

public sealed class UserProfileService : IUserProfileService
{
    private readonly AppDbContext _context;

    public UserProfileService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<UserProfileDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.UserProfiles
            .AsNoTracking()
            .Select(p => new UserProfileDto
            {
                Id = p.Id,
                Bio = p.Bio,
                AvatarUrl = p.AvatarUrl,
                DateOfBirth = p.DateOfBirth,
                Country = p.Country,
                UserId = p.UserId
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<UserProfileDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.UserProfiles
            .AsNoTracking()
            .Where(p => p.Id == id)
            .Select(p => new UserProfileDto
            {
                Id = p.Id,
                Bio = p.Bio,
                AvatarUrl = p.AvatarUrl,
                DateOfBirth = p.DateOfBirth,
                Country = p.Country,
                UserId = p.UserId
            })
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<UserProfileDto> CreateAsync(CreateUserProfileDto dto, CancellationToken cancellationToken = default)
    {
        var entity = new UserProfile
        {
            Bio = dto.Bio,
            AvatarUrl = dto.AvatarUrl,
            DateOfBirth = dto.DateOfBirth,
            Country = dto.Country,
            UserId = dto.UserId
        };

        _context.UserProfiles.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return MapToDto(entity);
    }

    public async Task<UserProfileDto?> UpdateAsync(int id, UpdateUserProfileDto dto, CancellationToken cancellationToken = default)
    {
        var entity = await _context.UserProfiles.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return null;
        }

        entity.Bio = dto.Bio;
        entity.AvatarUrl = dto.AvatarUrl;
        entity.DateOfBirth = dto.DateOfBirth;
        entity.Country = dto.Country;

        await _context.SaveChangesAsync(cancellationToken);
        return MapToDto(entity);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var entity = await _context.UserProfiles.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return false;
        }

        _context.UserProfiles.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static UserProfileDto MapToDto(UserProfile entity)
    {
        return new UserProfileDto
        {
            Id = entity.Id,
            Bio = entity.Bio,
            AvatarUrl = entity.AvatarUrl,
            DateOfBirth = entity.DateOfBirth,
            Country = entity.Country,
            UserId = entity.UserId
        };
    }
}
