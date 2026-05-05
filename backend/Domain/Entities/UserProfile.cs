using System.ComponentModel.DataAnnotations;

namespace MovieStreamingAPI.Domain.Entities;

public class UserProfile
{
    public int Id { get; set; }

    [MaxLength(300)]
    public string? Bio { get; set; }

    public string? AvatarUrl { get; set; }

    public DateTime? DateOfBirth { get; set; }

    [MaxLength(100)]
    public string? Country { get; set; }

    // Foreign Key
    public int UserId { get; set; }

    // Navigation Property
    public User User { get; set; } = null!;
}