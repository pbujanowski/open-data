import { GoldPricesConfigService } from './gold-prices-config.service';
import { ConfigModule } from '@nestjs/config';
import { createGoldPricesModuleMock } from './__mocks__/gold-prices.module.mock';

describe('GoldPricesConfigService', () => {
  let goldPricesConfigService: GoldPricesConfigService;

  beforeEach(async () => {
    const configModule = ConfigModule.forRoot({
      load: [
        () => ({ GOLD_PRICES_CURRENT_URL: 'https://gold-prices-current' }),
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
});
