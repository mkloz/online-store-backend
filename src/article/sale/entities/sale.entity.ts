import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Article, ArticleDiscription } from '@article/entities/article.entity';
import { Sale as ISale } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SaleDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  newPrise: number;

  @ApiProperty()
  activeTill: Date;
}

export class Sale extends SaleDiscription implements ISale {
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article | null;

  @Exclude()
  articleId: number | null;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Sale>) {
    super();
    Object.assign(this, partial);
    if (partial.article) {
      this.article = new Article(partial.article);
    }
  }
}
