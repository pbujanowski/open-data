import { Controller, Get } from '@nestjs/common';
import { GoldPricesService } from './gold-prices.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentGoldPriceResponseDto } from './dto/responses/current-gold-price-response.dto';

@ApiTags('gold-prices')
@Controller('gold-prices')
export class GoldPricesController {
  constructor(private readonly goldPricesService: GoldPricesService) {}

  @Get('current')
  @ApiResponse({
    status: 200,
    description: 'Fetches the current gold price',
    type: CurrentGoldPriceResponseDto,
  })
  getCurrentGoldPrice() {
    return this.goldPricesService.getCurrentGoldPrice();
  }
}
