import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Article, ArticleDiscription } from '@article/entities/article.entity';
import { ArticlePhoto as IFile } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ArticlePhotoDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'c2c572fc-2075-4f58-afc8-575cbbfe6223' })
  name: string;

  @ApiProperty({
    example: 'https://host:port/c2c572fc-2075-4f58-afc8-575cbbfe6223',
  })
  url: string;
}

export class ArticlePhoto extends ArticlePhotoDiscription implements IFile {
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article;

  @Exclude()
  articleId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ArticlePhoto>) {
    super();
    Object.assign(this, partial);
    if (this.article) {
      this.article = new Article(this.article);
    }
  }
}
