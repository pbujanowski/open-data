import { GoldPrice } from '../../dto/interfaces/gold-price.interface';

export class GetGoldPriceByDateQueryResponse implements GoldPrice {
  date: Date;
  price: number;
}
