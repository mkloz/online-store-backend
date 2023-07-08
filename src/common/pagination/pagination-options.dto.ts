import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { DEFAULT_ITEMS_LIMIT } from './default-pag-value.pipe';

export class PaginationOptionsDto {
  @ApiProperty({ required: false, default: 1 })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;
  @ApiProperty({ required: false, default: DEFAULT_ITEMS_LIMIT })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;
}
