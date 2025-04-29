import { GoldPrice } from '../../dto/interfaces/gold-price.interface';

export class GetTodayGoldPriceQueryResponse implements GoldPrice {
  date: Date;
  price: number;
}
