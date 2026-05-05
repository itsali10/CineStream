using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieStreamingAPI.Application.DTOs;
using MovieStreamingAPI.Application.Interfaces;

namespace MovieStreamingAPI.Controllers;

[ApiController]
[Route("api/watchlists")]
[Authorize]
public sealed class WatchListsController : ControllerBase
{
    private readonly IWatchListService _watchListService;

    public WatchListsController(IWatchListService watchListService)
    {
        _watchListService = watchListService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _watchListService.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _watchListService.GetByIdAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpGet("user/{userId:int}")]
    public async Task<IActionResult> GetByUserId(int userId)
    {
        var items = await _watchListService.GetByUserIdAsync(userId);
        return Ok(items);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateWatchListDto dto)
    {
        var created = await _watchListService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateWatchListDto dto)
    {
        var updated = await _watchListService.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _watchListService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
