import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';
import { ArticleExist } from 'src/article/validators/article-exist.validator';

export class CreateSaleDto {
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
  @ArticleExist()
  @IsOptional()
  @ApiPropertyOptional()
  article?: number;
}
