import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { Cart as ICart } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { User, UserDiscription } from '@user/user.entity';
import {
  CartItem,
  CartItemDiscription,
} from '@cart/cart-item/cart-item.entity';

export class CartDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @Exclude()
  userId: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
export class CartRelation {
  @ApiPropertyOptional({ type: () => UserDiscription })
  user?: User;

  @ApiPropertyOptional({ type: () => CartItemDiscription, isArray: true })
  cartItems?: CartItem[];
}

export class Cart
  extends IntersectionType(CartDiscription, CartRelation)
  implements ICart
{
  @ApiProperty()
  totalPrice?: number;

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
