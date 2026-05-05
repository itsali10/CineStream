using System.ComponentModel.DataAnnotations;

namespace MovieStreamingAPI.Domain.Entities;

public class Director
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Nationality { get; set; }

    [Range(1900, 2025)]
    public int BirthYear { get; set; }

    [MaxLength(500)]
    public string? Bio { get; set; }

    // Navigation Property
    public ICollection<Movie> Movies { get; set; } = new List<Movie>();
}