import { GoldPrice } from '../interfaces/gold-price.interface';

export class CurrentGoldPriceResponseDto implements GoldPrice {
  date: Date;
  price: number;
}
