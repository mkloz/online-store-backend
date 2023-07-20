import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ArticleExist } from 'src/article/validators/article-exist.validator';
import { ReviewExist } from 'src/review/validators/review-exist.validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  @ApiProperty({ example: 'Mykhailo' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Strong@93Kc2!' })
  @IsOptional()
  password?: string;

  @IsInt({ each: true })
  @ReviewExist({ each: true })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({ example: [1, 2, 3] })
  reviews?: number[] = [];

  @IsInt({ each: true })
  @ArticleExist({ each: true })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({ example: [1, 2, 3] })
  favorites?: number[] = [];
}
