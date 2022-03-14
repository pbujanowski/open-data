using MediatR;
using Microsoft.AspNetCore.Mvc;
using OpenData.Services.NationalBank.API.ExchangeRate.Queries.GetCurrentExchangeRates;

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

    [HttpGet("Current")]
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
}