import { Module } from '@nestjs/common';
import { GoldPricesController } from './gold-prices.controller';
import { GoldPricesConfigService } from './gold-prices-config.service';
import { GoldPricesService } from './gold-prices.service';
import { HttpModule } from '@nestjs/axios';
import { GetCurrentGoldPriceQueryHandler } from './queries/get-current-gold-price/get-current-gold-price.query-handler';

@Module({
  imports: [HttpModule],
  controllers: [GoldPricesController],
  providers: [
    GetCurrentGoldPriceQueryHandler,
    GoldPricesConfigService,
    GoldPricesService,
  ],
})
export class GoldPricesModule {}
