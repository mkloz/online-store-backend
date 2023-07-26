import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Cart as ICart } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { User, UserDiscription } from '@user/user.entity';
import {
  CartItem,
  CartItemDiscription,
} from '@cart/cart-item/entities/cart-item.entity';

export class CartDiscription {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty()
  totalPrice?: number | null;
}

export class Cart extends CartDiscription implements ICart {
  @ApiPropertyOptional({ type: () => UserDiscription })
  user?: User | null;

  @ApiPropertyOptional({ type: () => [CartItemDiscription] })
  cartItems?: CartItem[];
  @Exclude()
  userId: number | null;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Cart>) {
    super();
    Object.assign(this, partial);
    if (this.user) {
      this.user = new User(this.user);
    }
    if (partial.cartItems?.length) {
      this.cartItems = partial.cartItems?.map((el) => new CartItem(el));
    }
  }
}
