import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCurrentGoldPriceQuery } from './get-current-gold-price.query';
import { GetCurrentGoldPriceQueryResponse } from './get-current-gold-price.query-response';
import { firstValueFrom } from 'rxjs';
import { GoldPricesService } from '../../gold-prices.service';

@QueryHandler(GetCurrentGoldPriceQuery)
export class GetCurrentGoldPriceQueryHandler
  implements IQueryHandler<GetCurrentGoldPriceQuery>
{
  constructor(private readonly goldPricesService: GoldPricesService) {}

  execute(): Promise<GetCurrentGoldPriceQueryResponse> {
    return firstValueFrom(this.goldPricesService.getCurrentGoldPrice());
  }
}
