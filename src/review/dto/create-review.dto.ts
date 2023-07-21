import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';
import { ArticleExist } from 'src/article/validators/article-exist.validator';

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
  @ApiProperty()
  article: number;
}
