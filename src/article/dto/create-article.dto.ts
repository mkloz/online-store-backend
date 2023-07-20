import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CategoryExist } from 'src/category/validators/category-exist.validator';
import { FileExist } from 'src/file/validators/file-exist.validator';
import { ReviewExist } from 'src/review/validators/review-exist.validator';
import { SaleExist } from 'src/sale/validators/sale-exist.validator';

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
  images?: number[] = [];

  @IsOptional()
  @IsInt({ each: true })
  @SaleExist({ each: true })
  @ApiPropertyOptional({ example: 1 })
  sale?: number;

  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  @ReviewExist({ each: true })
  @ApiPropertyOptional({ example: [1, 2, 3] })
  reviews?: number[] = [];

  @IsOptional()
  @IsInt({ each: true })
  @IsArray()
  @CategoryExist({ each: true })
  @ApiPropertyOptional({ example: [1, 2, 3] })
  categories?: number[] = [];
}
