import { Module } from '@nestjs/common';
import { GoldPricesModule } from './gold-prices/gold-prices.module';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
    GoldPricesModule,
  ],
})
export class AppModule {}
