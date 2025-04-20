import { Controller, Get } from '@nestjs/common';
import { GoldPricesService } from './gold-prices.service';

@Controller('gold-prices')
export class GoldPricesController {
  constructor(private readonly goldPricesService: GoldPricesService) {}

  @Get('current')
  getCurrentGoldPrice() {
    return this.goldPricesService.getCurrentGoldPrice();
  }
}
