import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @ApiProperty({ example: 'bike' })
  @MaxLength(40)
  type: string;

  @IsInt()
  @ApiProperty({ example: 199 })
  price: number;

  @IsString()
  @MaxLength(3000)
  @ApiProperty({ example: 'You must to buy it' })
  discription: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ example: 'Cool Bike' })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({ example: 9, default: 1 })
  count?: number;

  @IsString()
  @MaxLength(100)
  @ApiProperty({ example: 'kids' })
  ageGroup: string;

  @IsString()
  @MaxLength(40)
  @ApiProperty({ example: 'unisex' })
  gender: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false })
  isPreviouslyUsed?: boolean;

  @IsInt({ each: true })
  @IsOptional()
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  images?: number[] = [];
}
