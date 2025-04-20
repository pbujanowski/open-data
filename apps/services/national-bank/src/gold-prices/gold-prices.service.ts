import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GoldPricesConfigService } from './gold-prices-config.service';
import { map, Observable } from 'rxjs';
import { NationalBankCurrentGoldPriceResponseDto } from './dto/responses/national-bank-current-gold-price-response.dto';
import { CurrentGoldPriceResponseDto } from './dto/responses/current-gold-price-response.dto';

@Injectable()
export class GoldPricesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly goldPricesConfigService: GoldPricesConfigService,
  ) {}

  getCurrentGoldPrice(): Observable<CurrentGoldPriceResponseDto> {
    return this.httpService
      .get<
        NationalBankCurrentGoldPriceResponseDto[]
      >(this.goldPricesConfigService.currentGoldPrice)
      .pipe(
        map((response: { data: NationalBankCurrentGoldPriceResponseDto[] }) => {
          const goldPrice = response.data[0];
          return {
            date: goldPrice.data,
            price: goldPrice.cena,
          };
        }),
      );
  }
}
