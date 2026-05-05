using System.ComponentModel.DataAnnotations;

namespace MovieStreamingAPI.Domain.Entities;

public class WatchList
{
    public int Id { get; set; }

    public DateTime AddedAt { get; set; } = DateTime.UtcNow;

    public bool IsWatched { get; set; } = false;

    // Foreign Keys
    public int UserId { get; set; }
    public int MovieId { get; set; }

    // Navigation Properties
    public User User { get; set; } = null!;
    public Movie Movie { get; set; } = null!;
}