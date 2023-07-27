import { ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryExist } from '@shared/validators';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FilterOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'bicycle' })
  @CategoryExist()
  category?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ example: 0, type: Number })
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ example: 0, type: Number })
  maxPrice?: number;
}
