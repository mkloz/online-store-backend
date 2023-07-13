import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 1, default: 1 })
  quantity?: number = 1;

  @IsInt()
  @IsPositive()
  @ApiProperty({ example: 1 })
  article: number;
}
