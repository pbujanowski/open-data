import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('GoldPricesController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/gold-prices/current (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/gold-prices/current')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');

    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('date');
  });
});
