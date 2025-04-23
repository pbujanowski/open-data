import { GoldPricesController } from './gold-prices.controller';
import { createGoldPricesModuleMock } from './__mocks__/gold-prices.module.mock';
import { GoldPricesService } from './gold-prices.service';
import { createGoldPriceFixture } from './__fixtures__/gold-price.fixture';
import { NotFoundException } from '@nestjs/common';
import { of, throwError } from 'rxjs';

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

  it('should return the today gold price', () => {
    const mockGoldPrice = createGoldPriceFixture();

    jest
      .spyOn(goldPricesService, 'getTodayGoldPrice')
      .mockReturnValue(of(mockGoldPrice));

    controller.getTodayGoldPrice().subscribe((result) => {
      expect(result).toEqual(mockGoldPrice);
      expect(goldPricesService).toHaveBeenCalled();
    });
  });

  it('should return 404 if no gold price found for today', () => {
    const notFoundException = new NotFoundException(
      'No gold price found for today',
    );

    jest
      .spyOn(goldPricesService, 'getTodayGoldPrice')
      .mockReturnValueOnce(throwError(() => notFoundException));

    controller.getTodayGoldPrice().subscribe({
      next: () => {
        fail('Expected method to throw NotFoundException');
      },
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).message).toBe(
          'No gold price found for today',
        );
      },
    });
  });

  it('should return the gold price by date', () => {
    const mockGoldPrice = createGoldPriceFixture();

    jest
      .spyOn(goldPricesService, 'getGoldPriceByDate')
      .mockReturnValue(of(mockGoldPrice));

    controller.getGoldPriceByDate(new Date()).subscribe((result) => {
      expect(result).toEqual(mockGoldPrice);
      expect(goldPricesService).toHaveBeenCalled();
    });
  });

  it('should return 404 if no gold price found for the specified date', () => {
    const notFoundException = new NotFoundException(
      'No gold price found for the specified date',
    );

    jest
      .spyOn(goldPricesService, 'getGoldPriceByDate')
      .mockReturnValueOnce(throwError(() => notFoundException));

    controller.getGoldPriceByDate(new Date()).subscribe({
      next: () => {
        fail('Expected method to throw NotFoundException');
      },
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).message).toBe(
          'No gold price found for the specified date',
        );
      },
    });
  });
});
