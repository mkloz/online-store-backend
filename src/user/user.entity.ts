import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Review, ReviewDiscription } from 'src/review/entities/review.entity';
import { User as IUser } from '@prisma/client';
import {
  Article,
  ArticleDiscription,
} from 'src/article/entities/article.entity';
export class UserDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Mykhailo' })
  name: string;

  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiProperty({
    enum: Role,
    example: 'user',
  })
  role: Role;

  @ApiProperty()
  isEmailConfirmed: boolean;

  @ApiProperty({ default: Provider.EMAIL })
  provider: Provider;
}
export class User extends UserDiscription implements Omit<IUser, 'password'> {
  @ApiPropertyOptional({ type: () => [ReviewDiscription] })
  reviews?: Review[];

  @ApiPropertyOptional({ type: () => [ArticleDiscription] })
  favorites?: Article[];

  @Exclude()
  password?: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
    if (partial.reviews?.length)
      this.reviews = partial.reviews.map((el) => new Review(el));
    if (partial.favorites?.length)
      this.favorites = partial.favorites.map((el) => new Article(el));
  }
}
