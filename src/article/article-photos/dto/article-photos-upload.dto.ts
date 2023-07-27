import { ApiProperty } from '@nestjs/swagger';
import { ArticleExist } from '@shared/validators';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ArticlePhotosUploadDto {
  @ApiProperty({ example: 3000 })
  @Type(() => Number)
  @IsInt()
  @ArticleExist()
  articleId: number;
}

export class ArticlePhotosUploadExtDto extends ArticlePhotosUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: Express.Multer.File[];
}
