import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLastGoldPricesQuery } from './get-last-gold-prices.query';
import { GoldPricesService } from '../../gold-prices.service';
import { lastValueFrom } from 'rxjs';
import { GetLastGoldPricesQueryResponse } from './get-last-gold-prices.query-response';

@QueryHandler(GetLastGoldPricesQuery)
export class GetLastGoldPricesQueryHandler
  implements IQueryHandler<GetLastGoldPricesQuery>
{
  constructor(private readonly goldPricesService: GoldPricesService) {}

  execute(
    query: GetLastGoldPricesQuery,
  ): Promise<GetLastGoldPricesQueryResponse[]> {
    return lastValueFrom(
      this.goldPricesService.getLastGoldPrices(query.topCount),
    );
  }
}
