import { GoldPricesService } from './gold-prices.service';
import { GoldPricesConfigService } from './gold-prices-config.service';
import { NationalBankCurrentGoldPriceResponseDto } from './dto/responses/national-bank-current-gold-price-response.dto';
import { CurrentGoldPriceResponseDto } from './dto/responses/current-gold-price-response.dto';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { createGoldPricesModuleMock } from './__mocks__/gold-prices.module.mock';
import { createNationalBankGoldPriceFixture } from './__fixtures__/national-bank-gold-price.fixture';

describe('GoldPricesService', () => {
  let goldPricesConfigService: GoldPricesConfigService;
  let goldPriceService: GoldPricesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await createGoldPricesModuleMock();

    goldPricesConfigService = module.get<GoldPricesConfigService>(
      GoldPricesConfigService,
    );
    goldPriceService = module.get<GoldPricesService>(GoldPricesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should all services be defined', () => {
    expect(goldPricesConfigService).toBeDefined();
    expect(goldPriceService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  it('should return current gold price', () => {
    const nationalBankGoldPrice = createNationalBankGoldPriceFixture();
    const mockDataResponse: NationalBankCurrentGoldPriceResponseDto[] = [
      nationalBankGoldPrice,
    ];
    const mockResponse: AxiosResponse<
      NationalBankCurrentGoldPriceResponseDto[]
    > = {
      data: mockDataResponse,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        url: 'https://api.example.com/gold-prices',
        headers: new AxiosHeaders().set('Content-Type', 'application/json'),
      },
    };
    const expectedResult: CurrentGoldPriceResponseDto = {
      date: nationalBankGoldPrice.data,
      price: nationalBankGoldPrice.cena,
    };
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    goldPriceService.getCurrentGoldPrice().subscribe((result) => {
      expect(result).toEqual(expectedResult);
    });
  });
});
