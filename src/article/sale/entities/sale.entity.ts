import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
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

  @Exclude()
  articleId: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
export class SaleRelation {
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article;
}
export class Sale
  extends IntersectionType(SaleDiscription, SaleRelation)
  implements ISale
{
  constructor(partial: Partial<Sale>) {
    super();
    Object.assign(this, partial);
    if (partial.article) {
      this.article = new Article(partial.article);
    }
  }
}
