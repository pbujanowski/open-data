import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoldPricesConfigService {
  constructor(private readonly configService: ConfigService) {}

  get currentGoldPrice(): string {
    return this.configService.get<string>('GOLD_PRICES_CURRENT_URL') || '';
  }
}
