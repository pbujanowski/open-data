import { GoldPrice } from '../../dto/interfaces/gold-price.interface';

export class GetGoldPricesByDateRangeQueryResponse implements GoldPrice {
  date: Date;
  price: number;
}
