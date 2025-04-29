import { Controller, Get, Param } from '@nestjs/common';
import { GoldPricesService } from './gold-prices.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentGoldPriceResponseDto } from './dto/responses/current-gold-price-response.dto';
import { LastGoldPricesResponseDto } from './dto/responses/last-gold-prices-response.dto';
import { TodayGoldPriceResponseDto } from './dto/responses/today-gold-price-response.dto';
import { GoldPriceByDateResponseDto } from './dto/responses/gold-price-by-date-response.dto';
import { GoldPricesByDateRangeResponseDto } from './dto/responses/gold-price-by-date-range-response.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetCurrentGoldPriceQuery } from './queries/get-current-gold-price/get-current-gold-price.query';
import { GetCurrentGoldPriceQueryResponse } from './queries/get-current-gold-price/get-current-gold-price.query-response';
import { GetLastGoldPricesQuery } from './queries/get-last-gold-prices/get-last-gold-prices.query';
import { GetTodayGoldPriceQuery } from './queries/get-today-gold-price/get-today-gold-price.query';
import { GetTodayGoldPriceQueryResponse } from './queries/get-today-gold-price/get-today-gold-price.query-response';
import { GetLastGoldPricesQueryResponse } from './queries/get-last-gold-prices/get-last-gold-prices.query-response';
import { GetGoldPriceByDateQuery } from './queries/get-gold-price-by-date/get-gold-price-by-date.query';
import { GetGoldPriceByDateQueryResponse } from './queries/get-gold-price-by-date/get-gold-price-by-date.query-response';
import { GetGoldPricesByDateRangeQueryResponse } from './queries/get-gold-prices-by-date-range/get-gold-prices-by-date-range.query-response';
import { GetGoldPricesByDateRangeQuery } from './queries/get-gold-prices-by-date-range/get-gold-prices-by-date-range.query';

@ApiTags('gold-prices')
@Controller('gold-prices')
export class GoldPricesController {
  constructor(
    private readonly goldPricesService: GoldPricesService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('current')
  @ApiResponse({
    status: 200,
    description: 'Fetches the current gold price',
    type: CurrentGoldPriceResponseDto,
  })
  async getCurrentGoldPrice(): Promise<CurrentGoldPriceResponseDto> {
    const queryResponse = await this.queryBus.execute<
      GetCurrentGoldPriceQuery,
      GetCurrentGoldPriceQueryResponse
    >(new GetCurrentGoldPriceQuery());

    return {
      date: queryResponse.date,
      price: queryResponse.price,
    };
  }

  @Get('last/:topCount')
  @ApiParam({
    name: 'topCount',
    description: 'The number of top gold prices to retrieve',
    type: Number,
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'Fetches the last gold prices',
    type: LastGoldPricesResponseDto,
  })
  async getLastGoldPrices(
    @Param('topCount') topCount: number,
  ): Promise<LastGoldPricesResponseDto[]> {
    const queryResponse = await this.queryBus.execute<
      GetLastGoldPricesQuery,
      GetLastGoldPricesQueryResponse[]
    >(new GetLastGoldPricesQuery(topCount));

    return queryResponse.map((goldPrice) => ({
      date: goldPrice.date,
      price: goldPrice.price,
    }));
  }

  @Get('today')
  @ApiResponse({
    status: 200,
    description: 'Fetches the today gold price',
    type: TodayGoldPriceResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No gold price found for today',
  })
  async getTodayGoldPrice(): Promise<TodayGoldPriceResponseDto> {
    const queryResponse = await this.queryBus.execute<
      GetTodayGoldPriceQuery,
      GetTodayGoldPriceQueryResponse
    >(new GetTodayGoldPriceQuery());

    return {
      date: queryResponse.date,
      price: queryResponse.price,
    };
  }

  @Get('by-date/:date')
  @ApiParam({
    name: 'date',
    description: 'The date for which to retrieve the gold price',
    type: Date,
    example: '2025-01-01',
  })
  @ApiResponse({
    status: 200,
    description: 'Fetches the gold price for a specific date',
    type: GoldPriceByDateResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No gold price found for the specified date',
  })
  async getGoldPriceByDate(
    @Param('date') date: Date,
  ): Promise<GoldPriceByDateResponseDto> {
    const queryResponse = await this.queryBus.execute<
      GetGoldPriceByDateQuery,
      GetGoldPriceByDateQueryResponse
    >(new GetGoldPriceByDateQuery(date));

    return {
      date: queryResponse.date,
      price: queryResponse.price,
    };
  }

  @Get('by-date-range/:startDate/:endDate')
  @ApiParam({
    name: 'startDate',
    description: 'The start date for the range',
    type: Date,
    example: '2025-01-01',
  })
  @ApiParam({
    name: 'endDate',
    description: 'The end date for the range',
    type: Date,
    example: '2025-01-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Fetches the gold prices for a specific date range',
    type: GoldPricesByDateRangeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No gold prices found for the specified date range',
  })
  async getGoldPricesByDateRange(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ): Promise<GoldPricesByDateRangeResponseDto[]> {
    const queryResponse = await this.queryBus.execute<
      GetGoldPricesByDateRangeQuery,
      GetGoldPricesByDateRangeQueryResponse[]
    >(new GetGoldPricesByDateRangeQuery(startDate, endDate));

    return queryResponse.map((goldPrice) => ({
      date: goldPrice.date,
      price: goldPrice.price,
    }));
  }
}
