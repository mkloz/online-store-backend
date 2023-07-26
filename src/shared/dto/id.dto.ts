import { ApiProperty } from '@nestjs/swagger';
import { ID } from '@shared/types';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IDDto implements ID {
  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  id: number;
}
