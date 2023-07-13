import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Article,
  ArticleDiscription,
} from 'src/article/entities/article.entity';
import { Sale as ISale } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SaleDiscription {
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
}

export class Sale extends SaleDiscription implements ISale {
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article;

  @Exclude()
  articleId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Sale>) {
    super();
    Object.assign(this, partial);
  }
}
