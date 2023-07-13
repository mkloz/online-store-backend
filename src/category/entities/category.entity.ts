import { ApiProperty } from '@nestjs/swagger';
import { ArticleDiscription } from 'src/article/entities/article.entity';
import { Category as ICategory } from '@prisma/client';

export class CategoryDiscription {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty()
  name: string;
}

export class Category extends CategoryDiscription implements ICategory {
  @ApiProperty({ type: () => [ArticleDiscription] })
  articles?: ArticleDiscription[];
}
