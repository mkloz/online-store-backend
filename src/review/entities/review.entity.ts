import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { Article, ArticleDiscription } from '@article/entities/article.entity';
import { Review as IReview } from '@prisma/client';
import { User, UserDiscription } from '@user/user.entity';
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

  @Exclude()
  articleId: number;

  @Exclude()
  authorId: number;
}

export class ReviewRelation {
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article;

  @ApiPropertyOptional({ type: () => UserDiscription })
  author?: User;
}

export class Review
  extends IntersectionType(ReviewDiscription, ReviewRelation)
  implements IReview
{
  constructor(partial: Partial<Review>) {
    super();
    Object.assign(this, partial);
    if (partial.article) {
      this.article = new Article(partial.article);
    }
    if (partial.author) {
      this.author = new User(partial.author);
    }
  }
}
