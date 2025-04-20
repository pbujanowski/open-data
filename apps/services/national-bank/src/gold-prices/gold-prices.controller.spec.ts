import { GoldPricesController } from './gold-prices.controller';
import { createGoldPricesModuleMock } from './__mocks__/gold-prices.module.mock';
import { GoldPricesService } from './gold-prices.service';
import { of } from 'rxjs';
import { createGoldPriceFixture } from './__fixtures__/gold-price.fixture';

describe('GoldPricesController', () => {
  let controller: GoldPricesController;
  let goldPricesService: GoldPricesService;

  beforeEach(async () => {
    const module = await createGoldPricesModuleMock();
    controller = module.get<GoldPricesController>(GoldPricesController);
    goldPricesService = module.get<GoldPricesService>(GoldPricesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the current gold price', () => {
    const mockGoldPrice = createGoldPriceFixture();

    jest
      .spyOn(goldPricesService, 'getCurrentGoldPrice')
      .mockReturnValue(of(mockGoldPrice));

    controller.getCurrentGoldPrice().subscribe((result) => {
      expect(result).toEqual(mockGoldPrice);
      expect(goldPricesService).toHaveBeenCalled();
    });
  });

  it('should return the last gold prices', () => {
    const mockGoldPrices = [createGoldPriceFixture(), createGoldPriceFixture()];

    jest
      .spyOn(goldPricesService, 'getLastGoldPrices')
      .mockReturnValue(of(mockGoldPrices));

    controller.getLastGoldPrices(2).subscribe((result) => {
      expect(result).toEqual(mockGoldPrices);
      expect(goldPricesService).toHaveBeenCalled();
    });
  });
});
