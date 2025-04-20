import { ApiProperty } from '@nestjs/swagger';
import { GoldPrice } from '../interfaces/gold-price.interface';

export class GoldPriceResponseDto implements GoldPrice {
  @ApiProperty({
    description: 'The date when the gold price was recorded',
    type: Date,
  })
  date: Date;

  @ApiProperty({
    description: 'The price of gold in the specified currency',
    type: Number,
  })
  price: number;
}
