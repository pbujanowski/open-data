import { GoldPrice } from '../../dto/interfaces/gold-price.interface';

export class GetLastGoldPricesQueryResponse implements GoldPrice {
  date: Date;
  price: number;
}
