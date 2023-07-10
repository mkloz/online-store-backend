import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  @MaxLength(1000)
  @ApiProperty()
  reason: string;

  @IsInt()
  @ApiProperty()
  oldPrise: number;

  @IsInt()
  @ApiProperty()
  newPrise: number;

  @IsDateString()
  @ApiProperty()
  activeTill: Date;

  @IsInt()
  @ApiPropertyOptional()
  article?: number;
}
