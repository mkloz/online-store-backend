import { ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryExist } from '@shared/validators';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum SaleFilter {
  INCLUDE = 'inc',
  EXCLUDE = 'exc',
}
export enum StockFilter {
  INCLUDE = 'inc',
  EXCLUDE = 'exc',
}
export enum StarsCount {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
}
export class FilterOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @CategoryExist()
  category?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional()
  maxPrice: number;

  @IsEnum(SaleFilter)
  @IsOptional()
  @ApiPropertyOptional({ enum: SaleFilter })
  sale?: SaleFilter;

  @IsEnum(StockFilter)
  @IsOptional()
  @ApiPropertyOptional({ enum: StockFilter })
  stock?: StockFilter;

  @IsEnum(StarsCount)
  @IsOptional()
  @ApiPropertyOptional({ enum: StarsCount })
  @Type(() => Number)
  starsCount?: StarsCount;
}
