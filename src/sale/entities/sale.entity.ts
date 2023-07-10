import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Article } from 'src/article/entities/article.entity';

export class Sale {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  oldPrise: number;

  @ApiProperty()
  newPrise: number;

  @ApiProperty()
  activeTill: Date;

  @ApiPropertyOptional({ type: () => Article })
  article?: Article;

  @ApiPropertyOptional()
  articleId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
