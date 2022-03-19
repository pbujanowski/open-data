using MediatR;
using Microsoft.AspNetCore.Mvc;
using OpenData.Services.NationalBank.Application.Dtos;
using OpenData.Services.NationalBank.Application.ExchangeRates.Commands.SynchronizeExchangeRatesByDates;
using OpenData.Services.NationalBank.Application.ExchangeRates.Queries.GetCurrentExchangeRates;

namespace OpenData.Services.NationalBank.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ExchangeRatesController : ControllerBase
{
    private readonly ILogger<ExchangeRatesController> _logger;
    private readonly IMediator _mediator;

    public ExchangeRatesController(ILogger<ExchangeRatesController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    [HttpGet("Current/{table}")]
    public async Task<IActionResult> GetCurrentExchangeRates(string table)
    {
        try
        {
            var response = await _mediator.Send(new GetCurrentExchangeRatesQuery(table));
            return Ok(response.Rates);
        }
        catch (Exception ex)
        {
            _logger.LogError("{Message}", ex.Message);
            return StatusCode(500);
        }
    }

    [HttpPost("Synchronize")]
    public async Task<IActionResult> SynchronizeExchangeRatesByDates([FromBody] ExchangeRatesByDatesDto body)
    {
        try
        {
            if (body.Table == null)
            {
                return BadRequest();
            }

            var response = await _mediator.Send(new SynchronizeExchangeRatesByDatesQuery(body.Table, body.StartDate, body.EndDate));
            return Ok(response.Rates);
        }
        catch (Exception ex)
        {
            _logger.LogError("{Message}", ex.Message);
            return StatusCode(500);
        }
    }
}