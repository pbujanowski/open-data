import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodayGoldPriceQuery } from './get-today-gold-price.query';
import { GoldPricesService } from '../../gold-prices.service';
import { GetTodayGoldPriceQueryResponse } from './get-today-gold-price.query-response';
import { firstValueFrom } from 'rxjs';

@QueryHandler(GetTodayGoldPriceQuery)
export class GetTodayGoldPriceQueryHandler
  implements IQueryHandler<GetTodayGoldPriceQuery>
{
  constructor(private readonly goldPricesService: GoldPricesService) {}

  execute(): Promise<GetTodayGoldPriceQueryResponse> {
    return firstValueFrom(this.goldPricesService.getTodayGoldPrice());
  }
}
