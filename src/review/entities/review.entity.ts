import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Article } from 'src/article/entities/article.entity';
import { Review as IReview } from '@prisma/client';
import { User } from 'src/user/user.entity';

export class Review implements IReview {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Not bad' })
  text: string;
  @ApiProperty({ example: 5 })
  stars: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiPropertyOptional()
  articleId: number;
  @ApiPropertyOptional({ type: () => Article })
  article?: Article;
  @ApiPropertyOptional()
  authorId: number;
  @ApiPropertyOptional({ type: () => User })
  author?: User;
}
