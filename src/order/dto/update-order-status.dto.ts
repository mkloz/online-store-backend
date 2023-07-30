import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum StatusInput {
  PROCESSED = 'PROCESSED',
  SENDED = 'SENDED',
  DELIVERED = 'DELIVERED',
  RECEIVED = 'RECEIVED',
}
export class UpdateOrderStatusDto {
  @ApiProperty({ enum: StatusInput })
  @IsEnum(StatusInput)
  status: StatusInput;
}
