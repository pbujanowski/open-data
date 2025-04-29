import { IQuery } from '@nestjs/cqrs';

export class GetGoldPriceByDateQuery implements IQuery {
  constructor(public readonly date: Date) {}
}
