import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GoldPricesConfigService } from './gold-prices-config.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { NationalBankCurrentGoldPriceResponseDto } from './dto/responses/national-bank-current-gold-price-response.dto';
import { CurrentGoldPriceResponseDto } from './dto/responses/current-gold-price-response.dto';
import { LastGoldPricesResponseDto } from './dto/responses/last-gold-prices-response.dto';
import { NationalBankLastGoldPricesResponseDto } from './dto/responses/national-bank-last-gold-prices-response.dto';
import { TodayGoldPriceResponseDto } from './dto/responses/today-gold-price-response.dto';
import { NationalBankTodayGoldPriceResponseDto } from './dto/responses/national-bank-today-gold-price-response.dto';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { GoldPriceByDateResponseDto } from './dto/responses/gold-price-by-date-response.dto';
import { NationalBankGoldPriceByDateResponseDto } from './dto/responses/national-bank-gold-price-by-date-response.dto';
import { GoldPricesByDateRangeResponseDto } from './dto/responses/gold-price-by-date-range-response.dto';
import { NationalBankGoldPricesByDateRangeResponseDto } from './dto/responses/national-bank-gold-prices-by-date-range-response.dto';

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

  getLastGoldPrices(topCount: number): Observable<LastGoldPricesResponseDto[]> {
    return this.httpService
      .get<
        NationalBankCurrentGoldPriceResponseDto[]
      >(`${this.goldPricesConfigService.lastGoldPrices}/${topCount}`)
      .pipe(
        map((response: { data: NationalBankLastGoldPricesResponseDto[] }) => {
          return response.data.map((goldPrice) => ({
            date: goldPrice.data,
            price: goldPrice.cena,
          }));
        }),
      );
  }

  getTodayGoldPrice(): Observable<TodayGoldPriceResponseDto> {
    return this.httpService
      .get<
        NationalBankTodayGoldPriceResponseDto[]
      >(this.goldPricesConfigService.todayGoldPrice)
      .pipe(
        map((response: { data: NationalBankTodayGoldPriceResponseDto[] }) => {
          const goldPrice = response.data[0];
          return {
            date: goldPrice.data,
            price: goldPrice.cena,
          };
        }),
        catchError((error: AxiosError) => {
          if (error.response?.status === 404) {
            throw new NotFoundException('No gold price found for today');
          }
          return throwError(() => error);
        }),
      );
  }

  getGoldPriceByDate(date: Date): Observable<GoldPriceByDateResponseDto> {
    return this.httpService
      .get<
        NationalBankGoldPriceByDateResponseDto[]
      >(`${this.goldPricesConfigService.goldPriceByDate}/${format(date, 'yyyy-MM-dd')}`)
      .pipe(
        map((response: { data: NationalBankGoldPriceByDateResponseDto[] }) => {
          const goldPrice = response.data[0];
          return {
            date: goldPrice.data,
            price: goldPrice.cena,
          };
        }),
        catchError((error: AxiosError) => {
          if (error.response?.status === 404) {
            throw new NotFoundException(
              'No gold price found for the given date',
            );
          }
          return throwError(() => error);
        }),
      );
  }

  getGoldPricesByDateRange(
    startDate: Date,
    endDate: Date,
  ): Observable<GoldPricesByDateRangeResponseDto[]> {
    const startDateFormatted = format(startDate, 'yyyy-MM-dd');
    const endDateFormatted = format(endDate, 'yyyy-MM-dd');

    return this.httpService
      .get<
        NationalBankGoldPricesByDateRangeResponseDto[]
      >(`${this.goldPricesConfigService.goldPricesByDateRange}/${startDateFormatted}/${endDateFormatted}`)
      .pipe(
        map(
          (response: {
            data: NationalBankGoldPricesByDateRangeResponseDto[];
          }) => {
            return response.data.map((goldPrice) => ({
              date: goldPrice.data,
              price: goldPrice.cena,
            }));
          },
        ),
        catchError((error: AxiosError) => {
          if (error.response?.status === 404) {
            throw new NotFoundException(
              'No gold prices found for the given date range',
            );
          }
          return throwError(() => error);
        }),
      );
  }
}
