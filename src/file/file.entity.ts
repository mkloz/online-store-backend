import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Article } from 'src/article/entities/article.entity';
import { File as IFile } from '@prisma/client';

export class File implements IFile {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'c2c572fc-2075-4f58-afc8-575cbbfe6223' })
  name: string;

  @ApiProperty({
    example: 'https://host:port/c2c572fc-2075-4f58-afc8-575cbbfe6223',
  })
  url: string;

  @ApiPropertyOptional({ type: Article })
  article?: Article;
  @ApiPropertyOptional()
  articleId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
