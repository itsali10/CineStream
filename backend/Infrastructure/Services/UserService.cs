using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MovieStreamingAPI.Application.DTOs;
using MovieStreamingAPI.Application.Interfaces;
using MovieStreamingAPI.Infrastructure.Persistence;
using MovieStreamingAPI.Domain.Entities;

namespace MovieStreamingAPI.Infrastructure.Services;

public sealed class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly IPasswordHasher<User> _passwordHasher;

    public UserService(AppDbContext context, IPasswordHasher<User> passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Role = u.Role,
                CreatedAt = u.CreatedAt
            })
            .ToListAsync(cancellationToken);
    }

    public async Task<UserDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .Where(u => u.Id == id)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Role = u.Role,
                CreatedAt = u.CreatedAt
            })
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<UserDto> CreateAsync(CreateUserDto dto, CancellationToken cancellationToken = default)
    {
        var entity = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            Role = NormalizeRole(dto.Role)
        };
        entity.PasswordHash = _passwordHasher.HashPassword(entity, dto.PasswordHash);

        _context.Users.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return MapToDto(entity);
    }

    public async Task<UserDto?> UpdateAsync(int id, UpdateUserDto dto, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Users.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return null;
        }

        entity.Username = dto.Username;
        entity.Email = dto.Email;
        entity.Role = NormalizeRole(dto.Role);

        if (!string.IsNullOrWhiteSpace(dto.PasswordHash))
        {
            entity.PasswordHash = _passwordHasher.HashPassword(entity, dto.PasswordHash);
        }

        await _context.SaveChangesAsync(cancellationToken);
        return MapToDto(entity);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Users.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return false;
        }

        _context.Users.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static UserDto MapToDto(User entity)
    {
        return new UserDto
        {
            Id = entity.Id,
            Username = entity.Username,
            Email = entity.Email,
            Role = entity.Role,
            CreatedAt = entity.CreatedAt
        };
    }

    private static string NormalizeRole(string role)
    {
        if (string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase))
        {
            return "Admin";
        }

        return "User";
    }
}
