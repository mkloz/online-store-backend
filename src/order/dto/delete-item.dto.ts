import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class OrdersDeleteItemDto {
  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  itemId: number;
}
