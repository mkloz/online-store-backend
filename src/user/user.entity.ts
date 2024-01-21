import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Review, ReviewDiscription } from '@review/entities/review.entity';
import { User as IUser } from '@prisma/client';
import { Article, ArticleDiscription } from '@article/entities/article.entity';
import { Cart, CartDiscription } from '@cart/cart.entity';
import { Address, AddressDicription } from '@app/order/entities/address.entity';
export class UserDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Mykhailo' })
  name: string;

  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiProperty({ example: '+44-2832-346-686' })
  phoneNumber: string | null;

  @ApiProperty({
    enum: Role,
    example: 'user',
  })
  role: Role;

  @ApiProperty()
  isEmailConfirmed: boolean;

  @ApiProperty({ default: Provider.EMAIL })
  provider: Provider;

  @Exclude()
  password: string | null;
  @Exclude()
  addressId: number | null;
}

export class UserRelation {
  // @ApiPropertyOptional({ type: () => ReviewDiscription, isArray: true })

  reviews?: Review[];

  @ApiPropertyOptional({ type: () => ArticleDiscription, isArray: true })
  favorites?: Article[];

  @ApiPropertyOptional({ type: () => CartDiscription, nullable: true })
  cart?: Cart | null;

  @ApiPropertyOptional({ type: () => AddressDicription, nullable: true })
  address?: Address | null;
}
export class User
  extends IntersectionType(UserDiscription, UserRelation)
  implements IUser
{
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);

    if (partial.reviews?.length)
      this.reviews = partial.reviews.map((el) => new Review(el));
    if (partial.favorites?.length)
      this.favorites = partial.favorites.map((el) => new Article(el));
    if (partial.cart) this.cart = new Cart(partial.cart);
    if (partial.address) this.address = new Address(partial.address);
  }
}
