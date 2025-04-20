import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { GoldPricesController } from '../gold-prices.controller';
import { GoldPricesConfigService } from '../gold-prices-config.service';
import { GoldPricesService } from '../gold-prices.service';
import { DynamicModule, ForwardReference, Type } from '@nestjs/common';

export const createGoldPricesModuleMock = (
  configModule:
    | DynamicModule
    | Promise<DynamicModule>
    | Type<any>
    | ForwardReference<any>
    | undefined = undefined,
) =>
  Test.createTestingModule({
    imports: [configModule || ConfigModule, HttpModule],
    controllers: [GoldPricesController],
    providers: [GoldPricesConfigService, GoldPricesService],
  }).compile();
