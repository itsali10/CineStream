using System.ComponentModel.DataAnnotations;

namespace MovieStreamingAPI.Application.DTOs;

public sealed class DirectorDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string? Nationality { get; set; }
    public int BirthYear { get; set; }
    public string? Bio { get; set; }
}

public sealed class CreateDirectorDto
{
    [Required]
    [MinLength(2)]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Nationality { get; set; }

    [Range(1900, 2100)]
    public int BirthYear { get; set; }

    [MaxLength(500)]
    public string? Bio { get; set; }
}

public sealed class UpdateDirectorDto
{
    [Required]
    [MinLength(2)]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Nationality { get; set; }

    [Range(1900, 2100)]
    public int BirthYear { get; set; }

    [MaxLength(500)]
    public string? Bio { get; set; }
}
