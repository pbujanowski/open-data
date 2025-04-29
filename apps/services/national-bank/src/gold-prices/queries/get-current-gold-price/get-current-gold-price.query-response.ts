import { GoldPrice } from '../../dto/interfaces/gold-price.interface';

export class GetCurrentGoldPriceQueryResponse implements GoldPrice {
  date: Date;
  price: number;
}
