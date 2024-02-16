import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Article, ArticleDiscription } from '@article/entities/article.entity';
import { CartItem as ICartItem } from '@prisma/client';
import { Cart } from '@cart/cart.entity';

export class CartItemDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1, default: 1 })
  quantity: number;

  @Exclude()
  cartId: number;

  @Exclude()
  articleId: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
export class CartItemRelation {
  @ApiPropertyOptional({ type: () => Article })
  article?: Article;

  // @ApiPropertyOptional({ type: () => CartDiscription })
  cart?: Cart;
}
export class CartItem
  extends IntersectionType(CartItemDiscription, CartItemRelation)
  implements ICartItem
{
  @ApiProperty({ example: 9.98 })
  subtotalPrice?: number;

  constructor(partial: Partial<CartItem>) {
    super();

    Object.assign(this, partial);

    if (this.article) {
      this.article = new Article(this.article);
    }
    if (this.cart) {
      this.cart = new Cart(this.cart);
    }
  }
}
