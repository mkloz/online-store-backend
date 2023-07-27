import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class SortArticleDto {
  @IsEnum(SortOrder)
  @IsOptional()
  @ApiPropertyOptional({
    example: SortOrder.ASC,
    enum: SortOrder,
  })
  price?: SortOrder;
}
