import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { PaginationOptionsDto } from '@shared/dto';
import { IsEnum, IsOptional } from 'class-validator';

export class FindManyOrdersDto extends PaginationOptionsDto {
  @ApiPropertyOptional({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
