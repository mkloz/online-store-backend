import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Article,
  ArticleDiscription,
} from 'src/article/entities/article.entity';
import { File as IFile } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class FileDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'c2c572fc-2075-4f58-afc8-575cbbfe6223' })
  name: string;

  @ApiProperty({
    example: 'https://host:port/c2c572fc-2075-4f58-afc8-575cbbfe6223',
  })
  url: string;
}

export class File extends FileDiscription implements IFile {
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article | null;

  @Exclude()
  articleId: number | null;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<File>) {
    super();
    Object.assign(this, partial);
    if (this.article) {
      this.article = new Article(this.article);
    }
  }
}
