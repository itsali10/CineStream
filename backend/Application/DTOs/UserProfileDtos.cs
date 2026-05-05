using System.ComponentModel.DataAnnotations;

namespace MovieStreamingAPI.Application.DTOs;

public sealed class UserProfileDto
{
    public int Id { get; set; }
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Country { get; set; }
    public int UserId { get; set; }
}

public sealed class CreateUserProfileDto
{
    [MaxLength(300)]
    public string? Bio { get; set; }

    [MaxLength(500)]
    public string? AvatarUrl { get; set; }

    [Range(typeof(DateTime), "1/1/1900", "12/31/2100")]
    public DateTime? DateOfBirth { get; set; }

    [MaxLength(100)]
    public string? Country { get; set; }

    [Range(1, int.MaxValue)]
    public int UserId { get; set; }
}

public sealed class UpdateUserProfileDto
{
    [MaxLength(300)]
    public string? Bio { get; set; }

    [MaxLength(500)]
    public string? AvatarUrl { get; set; }

    [Range(typeof(DateTime), "1/1/1900", "12/31/2100")]
    public DateTime? DateOfBirth { get; set; }

    [MaxLength(100)]
    public string? Country { get; set; }
}
