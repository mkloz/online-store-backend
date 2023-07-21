import { ApiProperty } from '@nestjs/swagger';
import {
  Article,
  ArticleDiscription,
} from 'src/article/entities/article.entity';
import { Category as ICategory } from '@prisma/client';

export class CategoryDiscription {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty()
  name: string;
}

export class Category extends CategoryDiscription implements ICategory {
  @ApiProperty({ type: () => [ArticleDiscription] })
  articles?: Article[];

  constructor(partial: Partial<Category>) {
    super();
    Object.assign(this, partial);
    if (this.articles?.length) {
      this.articles = this.articles.map((el) => new Article(el));
    }
  }
}
