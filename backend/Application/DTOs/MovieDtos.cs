using System.ComponentModel.DataAnnotations;

namespace MovieStreamingAPI.Application.DTOs;

public sealed class MovieDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Genre { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public int DurationMinutes { get; set; }
    public double Rating { get; set; }
    public string? ThumbnailUrl { get; set; }
    public int DirectorId { get; set; }
}

public sealed class CreateMovieDto
{
    [Required]
    [MinLength(1)]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    [MinLength(2)]
    [MaxLength(50)]
    public string Genre { get; set; } = string.Empty;

    [Range(1888, 2100)]
    public int ReleaseYear { get; set; }

    [Range(1, 600)]
    public int DurationMinutes { get; set; }

    [Range(0.0, 10.0)]
    public double Rating { get; set; }

    [MaxLength(500)]
    public string? ThumbnailUrl { get; set; }

    [Range(1, int.MaxValue)]
    public int DirectorId { get; set; }
}

public sealed class UpdateMovieDto
{
    [Required]
    [MinLength(1)]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    [MinLength(2)]
    [MaxLength(50)]
    public string Genre { get; set; } = string.Empty;

    [Range(1888, 2100)]
    public int ReleaseYear { get; set; }

    [Range(1, 600)]
    public int DurationMinutes { get; set; }

    [Range(0.0, 10.0)]
    public double Rating { get; set; }

    [MaxLength(500)]
    public string? ThumbnailUrl { get; set; }

    [Range(1, int.MaxValue)]
    public int DirectorId { get; set; }
}
