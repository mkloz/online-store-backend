import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CategoryExist, FileExist } from '@shared/validators';

export class CreateArticleDto {
  @IsString()
  @MaxLength(3000)
  @IsNotEmpty()
  @ApiProperty({ example: '18 kmph\n120 km max distance' })
  characteristic: string;

  @IsNumber()
  @ApiProperty({ example: 199.99 })
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  @ApiProperty({ example: 'You must to buy it' })
  discription: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ example: 'Cool Bike' })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    example: 9,
    default: 1,
    description: 'excluded for regular users',
  })
  count?: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ example: false })
  isPreviouslyUsed?: boolean;

  @IsOptional()
  @IsInt({ each: true })
  @FileExist({ each: true })
  @IsArray()
  @ApiPropertyOptional({ example: [1, 2, 3] })
  images?: number[];

  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  @CategoryExist({ each: true })
  @ApiPropertyOptional({ example: [1, 2, 3] })
  categories?: number[];
}
