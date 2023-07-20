import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ArticleExist } from 'src/article/validators/article-exist.validator';
import { UserExist } from 'src/user/validators/user-exist.validator';

export class CreateReviewDto {
  @IsString()
  @MaxLength(3000)
  @ApiProperty({ example: 'Not bad' })
  text: string;

  @IsInt()
  @Max(5)
  @Min(0)
  @ApiProperty({ example: 5 })
  stars: number;

  @IsInt()
  @ArticleExist()
  @IsOptional()
  @ArticleExist()
  @ApiPropertyOptional()
  article?: number;

  @IsInt()
  @UserExist()
  @IsOptional()
  @ApiPropertyOptional()
  author?: number;
}
