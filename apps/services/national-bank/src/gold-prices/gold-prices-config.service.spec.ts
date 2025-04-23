import { GoldPricesConfigService } from './gold-prices-config.service';
import { ConfigModule } from '@nestjs/config';
import { createGoldPricesModuleMock } from './__mocks__/gold-prices.module.mock';

describe('GoldPricesConfigService', () => {
  let goldPricesConfigService: GoldPricesConfigService;

  beforeEach(async () => {
    const configModule = ConfigModule.forRoot({
      load: [
        () => ({
          GOLD_PRICES_CURRENT_URL: 'https://gold-prices-current',
          GOLD_PRICES_LAST_URL: 'https://gold-prices-last',
          GOLD_PRICES_TODAY_URL: 'https://gold-prices-today',
          GOLD_PRICES_BY_DATE_URL: 'https://gold-prices-by-date',
        }),
      ],
    });
    const module = await createGoldPricesModuleMock(configModule);

    goldPricesConfigService = module.get<GoldPricesConfigService>(
      GoldPricesConfigService,
    );
  });

  it('should be defined', () => {
    expect(goldPricesConfigService).toBeDefined();
  });

  it('should return URL for getting current gold price', () => {
    const result = goldPricesConfigService.currentGoldPrice;

    expect(result).toBe('https://gold-prices-current');
  });

  it('should return URL for getting last gold prices', () => {
    const result = goldPricesConfigService.lastGoldPrices;

    expect(result).toBe('https://gold-prices-last');
  });

  it('should return URL for getting today gold price', () => {
    const result = goldPricesConfigService.todayGoldPrice;

    expect(result).toBe('https://gold-prices-today');
  });

  it('should return URL for getting gold price by date', () => {
    const result = goldPricesConfigService.goldPriceByDate;

    expect(result).toBe('https://gold-prices-by-date');
  });
});
