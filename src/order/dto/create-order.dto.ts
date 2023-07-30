import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsPostalCode, IsString, Length } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Be carefull it is a present' })
  addition?: string;

  @IsString()
  @Length(4, 300)
  @ApiProperty({ example: '23 Street' })
  street: string;
  @IsString()
  @Length(1, 300)
  @ApiProperty({ example: 'City' })
  city: string;
  @IsString()
  @Length(1, 300)
  @ApiProperty({ example: 'United Kingdom' })
  country: string;
  @IsPostalCode('GB')
  @ApiProperty({ example: '223324' })
  postCode: string;
}
