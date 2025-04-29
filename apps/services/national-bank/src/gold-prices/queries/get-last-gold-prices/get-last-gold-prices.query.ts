import { IQuery } from '@nestjs/cqrs';

export class GetLastGoldPricesQuery implements IQuery {
  constructor(public readonly topCount: number) {}
}
