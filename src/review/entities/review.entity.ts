import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Article,
  ArticleDiscription,
} from 'src/article/entities/article.entity';
import { Review as IReview } from '@prisma/client';
import { User, UserDiscription } from 'src/user/user.entity';
import { Exclude } from 'class-transformer';

export class ReviewDiscription {
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
}

export class Review extends ReviewDiscription implements IReview {
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article;

  @ApiPropertyOptional({ type: () => UserDiscription })
  author?: User;

  @Exclude()
  articleId: number;
  @Exclude()
  authorId: number;

  constructor(partial: Partial<Review>) {
    super();
    Object.assign(this, partial);
    if (this.article) {
      this.article = new Article(partial.article);
    }
    if (this.author) {
      this.author = new User(partial.author);
    }
  }
}
