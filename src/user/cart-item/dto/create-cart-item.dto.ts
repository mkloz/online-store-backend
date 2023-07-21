import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { ArticleExist } from 'src/article/validators/article-exist.validator';

export class CreateCartItemDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 1, default: 1 })
  quantity = 1;

  @IsInt()
  @ArticleExist()
  @IsPositive()
  @ApiProperty({ example: 1 })
  article: number;
}
