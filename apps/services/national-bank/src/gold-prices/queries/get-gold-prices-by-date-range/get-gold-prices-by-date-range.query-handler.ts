import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGoldPricesByDateRangeQuery } from './get-gold-prices-by-date-range.query';
import { GoldPricesService } from '../../gold-prices.service';
import { GetGoldPricesByDateRangeQueryResponse } from './get-gold-prices-by-date-range.query-response';
import { firstValueFrom } from 'rxjs';

@QueryHandler(GetGoldPricesByDateRangeQuery)
export class GetGoldPricesByDateRangeQueryHandler
  implements IQueryHandler<GetGoldPricesByDateRangeQuery>
{
  constructor(private readonly goldPricesService: GoldPricesService) {}

  execute(
    query: GetGoldPricesByDateRangeQuery,
  ): Promise<GetGoldPricesByDateRangeQueryResponse[]> {
    return firstValueFrom(
      this.goldPricesService.getGoldPricesByDateRange(
        query.startDate,
        query.endDate,
      ),
    );
  }
}
