import { IQuery } from '@nestjs/cqrs';

export class GetGoldPricesByDateRangeQuery implements IQuery {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}
