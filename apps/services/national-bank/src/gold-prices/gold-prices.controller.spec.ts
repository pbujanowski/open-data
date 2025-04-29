import { GoldPricesController } from './gold-prices.controller';
import { createGoldPricesModuleMock } from './__mocks__/gold-prices.module.mock';
import { createGoldPriceFixture } from './__fixtures__/gold-price.fixture';
import { NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

describe('GoldPricesController', () => {
  let controller: GoldPricesController;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module = await createGoldPricesModuleMock();
    controller = module.get<GoldPricesController>(GoldPricesController);
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
    const topCount = 2;

    jest
      .spyOn(queryBus, 'execute')
      .mockReturnValue(Promise.resolve(mockGoldPrices));

    const result = await controller.getLastGoldPrices(topCount);

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

  it('should return the gold price by date', async () => {
    const mockGoldPrice = createGoldPriceFixture();
    const date = new Date();

    jest
      .spyOn(queryBus, 'execute')
      .mockReturnValue(Promise.resolve(mockGoldPrice));

    const result = await controller.getGoldPriceByDate(date);

    expect(result).toEqual(mockGoldPrice);
  });

  it('should return 404 if no gold price found for the specified date', async () => {
    const notFoundException = new NotFoundException(
      'No gold price found for the specified date',
    );
    const date = new Date();

    jest
      .spyOn(queryBus, 'execute')
      .mockReturnValue(Promise.reject(notFoundException));

    await expect(controller.getGoldPriceByDate(date)).rejects.toThrow(
      NotFoundException,
    );
    await expect(controller.getGoldPriceByDate(date)).rejects.toThrow(
      'No gold price found for the specified date',
    );
  });

  it('should return the gold prices by date range', async () => {
    const mockGoldPrices = [createGoldPriceFixture(), createGoldPriceFixture()];
    const startDate = new Date();
    const endDate = new Date();

    jest
      .spyOn(queryBus, 'execute')
      .mockReturnValue(Promise.resolve(mockGoldPrices));

    const result = await controller.getGoldPricesByDateRange(
      startDate,
      endDate,
    );

    expect(result).toEqual(mockGoldPrices);
  });

  it('should return 404 if no gold prices found for the specified date range', async () => {
    const notFoundException = new NotFoundException(
      'No gold prices found for the specified date range',
    );
    const startDate = new Date();
    const endDate = new Date();

    jest
      .spyOn(queryBus, 'execute')
      .mockReturnValue(Promise.reject(notFoundException));

    await expect(
      controller.getGoldPricesByDateRange(startDate, endDate),
    ).rejects.toThrow(NotFoundException);
    await expect(controller.getTodayGoldPrice()).rejects.toThrow(
      'No gold prices found for the specified date range',
    );
  });
});
