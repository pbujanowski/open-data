using MediatR;
using Microsoft.AspNetCore.Mvc;
using OpenData.Services.NationalBank.Application.Dtos;
using OpenData.Services.NationalBank.Application.GoldPrices.Commands.SynchronizeGoldPricesByDates;
using OpenData.Services.NationalBank.Application.GoldPrices.Queries.GetCurrentGoldPrice;
using OpenData.Services.NationalBank.Application.GoldPrices.Queries.GetGoldPricesCountByDates;
using OpenData.Services.NationalBank.Application.GoldPrices.Queries.GetGoldPricesWithFilters;

namespace OpenData.Services.NationalBank.API.Controllers;

[ApiController]
[Route("[controller]")]
public class GoldPricesController : ControllerBase
{
    private readonly ILogger<GoldPricesController> _logger;
    private readonly IMediator _mediator;

    public GoldPricesController(ILogger<GoldPricesController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    [HttpGet("Current")]
    public async Task<IActionResult> GetCurrentGoldPrice()
    {
        try
        {
            var response = await _mediator.Send(new GetCurrentGoldPriceQuery());
            return Ok(response.GoldPrice);
        }
        catch (Exception ex)
        {
            _logger.LogError("{Message}", ex.Message);
            return StatusCode(500);
        }
    }

    [HttpGet("Count")]
    public async Task<IActionResult> GetGoldPricesCount(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        try
        {
            var now = DateTime.Now;
            var response = await _mediator.Send(new GetGoldPricesCountByDatesQuery(startDate ?? now, endDate ?? now));
            return Ok(response.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError("{Message}", ex.Message);
            return StatusCode(500);
        }
    }

    [HttpGet("Get")]
    public async Task<IActionResult> GetGoldPricesWithFilters(
        [FromQuery] int pageNumber,
        [FromQuery] int pageSize,
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate)
    {
        try
        {
            var response = await _mediator.Send(
                new GetGoldPricesWithFiltersQuery(pageNumber, pageSize, startDate, endDate));

            return Ok(response.GoldPrices);
        }
        catch (Exception ex)
        {
            _logger.LogError("{Message}", ex.Message);
            return StatusCode(500);
        }
    }

    [HttpPost("Synchronize")]
    public async Task<IActionResult> SynchronizeGoldPricesByDates([FromBody] GoldPricesByDatesDto body)
    {
        try
        {
            var response = await _mediator.Send(new SynchronizeGoldPricesByDatesQuery(body));
            return Ok(response.GoldPrices);
        }
        catch (Exception ex)
        {
            _logger.LogError("{Message}", ex.Message);
            return StatusCode(500);
        }
    }
}