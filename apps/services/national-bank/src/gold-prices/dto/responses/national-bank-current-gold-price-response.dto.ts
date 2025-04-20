import { NationalBankGoldPrice } from '../interfaces/national-bank-gold-price.interface';

export class NationalBankCurrentGoldPriceResponseDto
  implements NationalBankGoldPrice
{
  data: Date;
  cena: number;
}
