import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/article/entities/article.entity';
import { User } from 'src/user/user.entity';

export class CartItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1, default: 1 })
  quantity?: number = 1;

  @ApiProperty({ example: 1 })
  articleId: number;

  @ApiProperty({ type: Article })
  article?: Article;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ type: User })
  user?: User;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
