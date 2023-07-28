import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortOrder } from '@utils/sort-order.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class SortArticleDto {
  @IsEnum(SortOrder)
  @IsOptional()
  @ApiPropertyOptional({
    enum: SortOrder,
  })
  price?: SortOrder;

  @IsEnum(SortOrder)
  @IsOptional()
  @ApiPropertyOptional({
    enum: SortOrder,
  })
  rating?: SortOrder;
}
