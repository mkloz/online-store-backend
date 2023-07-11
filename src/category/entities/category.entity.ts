import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/article/entities/article.entity';
import { Category as ICategory } from '@prisma/client';

export class Category implements ICategory {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: Article })
  articles?: Article[];
}
