import { Module } from '@nestjs/common';
import { GoldPricesController } from './gold-prices.controller';
import { GoldPricesConfigService } from './gold-prices-config.service';
import { GoldPricesService } from './gold-prices.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [GoldPricesController],
  providers: [GoldPricesConfigService, GoldPricesService],
})
export class GoldPricesModule {}
