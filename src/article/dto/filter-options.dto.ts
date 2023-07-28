import { ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryExist } from '@shared/validators';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

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
  maxPrice?: number;
}
