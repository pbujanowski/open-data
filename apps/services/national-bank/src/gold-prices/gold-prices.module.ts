import { Module } from '@nestjs/common';
import { GoldPricesController } from './gold-prices.controller';
import { GoldPricesConfigService } from './gold-prices-config.service';
import { GoldPricesService } from './gold-prices.service';
import { HttpModule } from '@nestjs/axios';
import { GetCurrentGoldPriceQueryHandler } from './queries/get-current-gold-price/get-current-gold-price.query-handler';
import { GetLastGoldPricesQueryHandler } from './queries/get-last-gold-prices/get-last-gold-prices.query-handler';
import { GetTodayGoldPriceQueryHandler } from './queries/get-today-gold-price/get-today-gold-price.query-handler';

@Module({
  imports: [HttpModule],
  controllers: [GoldPricesController],
  providers: [
    GetCurrentGoldPriceQueryHandler,
    GetLastGoldPricesQueryHandler,
    GetTodayGoldPriceQueryHandler,
    GoldPricesConfigService,
    GoldPricesService,
  ],
})
export class GoldPricesModule {}
