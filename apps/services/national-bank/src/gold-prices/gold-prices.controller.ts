import { Controller, Get, Param } from '@nestjs/common';
import { GoldPricesService } from './gold-prices.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentGoldPriceResponseDto } from './dto/responses/current-gold-price-response.dto';
import { LastGoldPricesResponseDto } from './dto/responses/last-gold-prices-response.dto';
import { TodayGoldPriceResponseDto } from './dto/responses/today-gold-price-response.dto';

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

  @Get('last/:topCount')
  @ApiParam({
    name: 'topCount',
    description: 'The number of top gold prices to retrieve',
    type: Number,
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'Fetches the last gold prices',
    type: LastGoldPricesResponseDto,
  })
  getLastGoldPrices(@Param('topCount') topCount: number) {
    return this.goldPricesService.getLastGoldPrices(topCount);
  }

  @Get('today')
  @ApiResponse({
    status: 200,
    description: 'Fetches the today gold price',
    type: TodayGoldPriceResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No gold price found for today',
  })
  getTodayGoldPrice() {
    return this.goldPricesService.getTodayGoldPrice();
  }
}
