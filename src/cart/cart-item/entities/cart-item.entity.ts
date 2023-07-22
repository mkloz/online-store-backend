import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Article,
  ArticleDiscription,
} from 'src/article/entities/article.entity';
import { CartItem as ICartItem } from '@prisma/client';
import { Cart, CartDiscription } from 'src/cart/entities/cart.entity';
export class CartItemDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1, default: 1 })
  quantity: number;

  @ApiProperty({ example: 9.98 })
  subtotalPrice: number | null;
}
export class CartItem extends CartItemDiscription implements ICartItem {
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article | null;

  @ApiPropertyOptional({ type: () => CartDiscription })
  cart?: Cart | null;

  @Exclude()
  cartId: number | null;
  @Exclude()
  articleId: number | null;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

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
