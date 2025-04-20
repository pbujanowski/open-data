import { Module } from '@nestjs/common';
import { GoldPricesModule } from './gold-prices/gold-prices.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    GoldPricesModule,
  ],
})
export class AppModule {}
