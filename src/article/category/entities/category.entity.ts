import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Article, ArticleDiscription } from '@article/entities/article.entity';
import { Category as ICategory } from '@prisma/client';

export class CategoryDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  name: string;
}
export class CategoryRelation {
  @ApiProperty({ type: () => ArticleDiscription, isArray: true })
  articles?: Article[];
}
export class Category
  extends IntersectionType(CategoryDiscription, CategoryRelation)
  implements ICategory
{
  constructor(partial: Partial<Category>) {
    super();
    Object.assign(this, partial);
    if (this.articles?.length) {
      this.articles = this.articles.map((el) => new Article(el));
    }
  }
}
