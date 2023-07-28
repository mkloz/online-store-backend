import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchArticleDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search?: string;
}
