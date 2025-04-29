import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { GoldPricesController } from '../gold-prices.controller';
import { GoldPricesConfigService } from '../gold-prices-config.service';
import { GoldPricesService } from '../gold-prices.service';
import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { GetCurrentGoldPriceQueryHandler } from '../queries/get-current-gold-price/get-current-gold-price.query-handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetLastGoldPricesQueryHandler } from '../queries/get-last-gold-prices/get-last-gold-prices.query-handler';
import { GetTodayGoldPriceQueryHandler } from '../queries/get-today-gold-price/get-today-gold-price.query-handler';
import { GetGoldPriceByDateQueryHandler } from '../queries/get-gold-price-by-date/get-gold-price-by-date.query-handler';

export const createGoldPricesModuleMock = (
  configModule:
    | DynamicModule
    | Promise<DynamicModule>
    | Type<any>
    | ForwardReference<any>
    | undefined = undefined,
) =>
  Test.createTestingModule({
    imports: [configModule || ConfigModule, CqrsModule, HttpModule],
    controllers: [GoldPricesController],
    providers: [
      GetCurrentGoldPriceQueryHandler,
      GetGoldPriceByDateQueryHandler,
      GetLastGoldPricesQueryHandler,
      GetTodayGoldPriceQueryHandler,
      GoldPricesConfigService,
      GoldPricesService,
    ],
  }).compile();
