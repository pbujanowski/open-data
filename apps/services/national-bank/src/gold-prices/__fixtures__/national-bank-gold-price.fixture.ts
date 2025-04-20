import { NationalBankGoldPrice } from '../dto/interfaces/national-bank-gold-price.interface';

export const createNationalBankGoldPriceFixture = (
  data: NationalBankGoldPrice | undefined = undefined,
): NationalBankGoldPrice =>
  data || { data: new Date('2025-01-01'), cena: 325.45 };
