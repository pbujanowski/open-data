import { NationalBankGoldPrice } from '../interfaces/national-bank-gold-price.interface';

export class NationalBankGoldPriceResponseDto implements NationalBankGoldPrice {
  data: Date;
  cena: number;
}
