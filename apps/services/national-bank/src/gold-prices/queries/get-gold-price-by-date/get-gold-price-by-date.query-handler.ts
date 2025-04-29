import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGoldPriceByDateQuery } from './get-gold-price-by-date.query';
import { GetGoldPriceByDateQueryResponse } from './get-gold-price-by-date.query-response';
import { GoldPricesService } from '../../gold-prices.service';
import { firstValueFrom } from 'rxjs';

@QueryHandler(GetGoldPriceByDateQuery)
export class GetGoldPriceByDateQueryHandler
  implements IQueryHandler<GetGoldPriceByDateQuery>
{
  constructor(private readonly goldPricesService: GoldPricesService) {}

  execute(
    query: GetGoldPriceByDateQuery,
  ): Promise<GetGoldPriceByDateQueryResponse> {
    return firstValueFrom(
      this.goldPricesService.getGoldPriceByDate(query.date),
    );
  }
}
