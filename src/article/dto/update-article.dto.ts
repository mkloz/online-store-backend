import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  views?: number;
}
