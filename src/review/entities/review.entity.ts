import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Article } from 'src/article/entities/article.entity';

export class Review {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Not bad' })
  text: string;
  @ApiProperty({ example: 5 })
  stars: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiPropertyOptional()
  articleId?: number;
  @ApiPropertyOptional({ type: () => Article })
  article?: Article;
}
