import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortOrder } from '@utils/sort-order.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class SortReviewDto {
  @IsEnum(SortOrder)
  @IsOptional()
  @ApiPropertyOptional({
    example: SortOrder.ASC,
    enum: SortOrder,
  })
  stars?: SortOrder;
}
