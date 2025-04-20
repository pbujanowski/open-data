import { GoldPrice } from '../dto/interfaces/gold-price.interface';

export const createGoldPriceFixture = (
  data: GoldPrice | undefined = undefined,
): GoldPrice =>
  data || {
    date: new Date('2025-01-01'),
    price: 325.45,
  };
