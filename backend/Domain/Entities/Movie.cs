using System.ComponentModel.DataAnnotations;

namespace MovieStreamingAPI.Domain.Entities;

public class Movie
{
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    [MaxLength(50)]
    public string Genre { get; set; } = string.Empty;

    [Range(1888, 2026)]
    public int ReleaseYear { get; set; }

    [Range(1, 600)]
    public int DurationMinutes { get; set; }

    [Range(0.0, 10.0)]
    public double Rating { get; set; }

    public string? ThumbnailUrl { get; set; }

    // Foreign Key
    public int DirectorId { get; set; }

    // Navigation Properties
    public Director Director { get; set; } = null!;
    public ICollection<WatchList> WatchList { get; set; } = new List<WatchList>();
}