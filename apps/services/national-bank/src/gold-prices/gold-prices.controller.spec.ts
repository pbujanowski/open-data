import { GoldPricesController } from './gold-prices.controller';
import { createGoldPricesModuleMock } from './__mocks__/gold-prices.module.mock';
import { GoldPricesService } from './gold-prices.service';
import { createGoldPriceFixture } from './__fixtures__/gold-price.fixture';
import { NotFoundException } from '@nestjs/common';
import { firstValueFrom, of, throwError } from 'rxjs';
import { QueryBus } from '@nestjs/cqrs';

describe('GoldPricesController', () => {
  let controller: GoldPricesController;
  let goldPricesService: GoldPricesService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module = await createGoldPricesModuleMock();
    controller = module.get<GoldPricesController>(GoldPricesController);
    goldPricesService = module.get<GoldPricesService>(GoldPricesService);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the current gold price', async () => {
    const mockGoldPrice = createGoldPriceFixture();

    jest
      .spyOn(queryBus, 'execute')
      .mockReturnValue(Promise.resolve(mockGoldPrice));

    const result = await controller.getCurrentGoldPrice();

    expect(result).toEqual(mockGoldPrice);
  });

  it('should return the last gold prices', async () => {
    const mockGoldPrices = [createGoldPriceFixture(), createGoldPriceFixture()];

    jest
      .spyOn(queryBus, 'execute')
      .mockReturnValue(Promise.resolve(mockGoldPrices));

    const result = await controller.getLastGoldPrices(2);

    expect(result).toEqual(mockGoldPrices);
  });

  it('should return the today gold price', async () => {
    const mockGoldPrice = createGoldPriceFixture();

    jest
      .spyOn(queryBus, 'execute')
      .mockReturnValue(Promise.resolve(mockGoldPrice));

    const result = await controller.getTodayGoldPrice();

    expect(result).toEqual(mockGoldPrice);
  });

  it('should return 404 if no gold price found for today', async () => {
    const notFoundException = new NotFoundException(
      'No gold price found for today',
    );

    jest
      .spyOn(queryBus, 'execute')
      .mockReturnValue(Promise.reject(notFoundException));

    await expect(controller.getTodayGoldPrice()).rejects.toThrow(
      NotFoundException,
    );
    await expect(controller.getTodayGoldPrice()).rejects.toThrow(
      'No gold price found for today',
    );
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

  it('should return the gold prices by date range', () => {
    const mockGoldPrices = [createGoldPriceFixture(), createGoldPriceFixture()];

    jest
      .spyOn(goldPricesService, 'getGoldPricesByDateRange')
      .mockReturnValue(of(mockGoldPrices));

    controller
      .getGoldPricesByDateRange(new Date(), new Date())
      .subscribe((result) => {
        expect(result).toEqual(mockGoldPrices);
        expect(goldPricesService).toHaveBeenCalled();
      });
  });

  it('should return 404 if no gold prices found for the specified date range', () => {
    const notFoundException = new NotFoundException(
      'No gold prices found for the specified date range',
    );

    jest
      .spyOn(goldPricesService, 'getGoldPricesByDateRange')
      .mockReturnValueOnce(throwError(() => notFoundException));

    controller.getGoldPricesByDateRange(new Date(), new Date()).subscribe({
      next: () => {
        fail('Expected method to throw NotFoundException');
      },
      error: (error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).message).toBe(
          'No gold prices found for the specified date range',
        );
      },
    });
  });
});
