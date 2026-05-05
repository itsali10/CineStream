using System.ComponentModel.DataAnnotations;

namespace MovieStreamingAPI.Application.DTOs;

public sealed class WatchListDto
{
    public int Id { get; set; }
    public DateTime AddedAt { get; set; }
    public bool IsWatched { get; set; }
    public int UserId { get; set; }
    public int MovieId { get; set; }
}

public sealed class CreateWatchListDto
{
    [Required]
    public bool IsWatched { get; set; }

    [Range(1, int.MaxValue)]
    public int UserId { get; set; }

    [Range(1, int.MaxValue)]
    public int MovieId { get; set; }
}

public sealed class UpdateWatchListDto
{
    [Required]
    public bool IsWatched { get; set; }
}
