import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Article } from 'src/article/entities/article.entity';
import { Sale as ISale } from '@prisma/client';
export class Sale implements ISale {
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
