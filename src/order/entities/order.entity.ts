import { OrderStatus } from '@prisma/client';
import { Cancel, CancelDiscription } from './cancel.entity';
import { User, UserDiscription } from '@user/user.entity';
import { OrderItem } from './order-item.entity';
import { Delivery, DeliveryDicription } from './delivery.entity';
import { Order as IOrder } from '@prisma/client';
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Address, AddressDicription } from './address.entity';
export class OrderDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  userId: number | null;

  @Exclude()
  addressId: number;
}

export class OrderRelation {
  @ApiPropertyOptional({ type: () => AddressDicription })
  address?: Address;

  @ApiPropertyOptional({ type: () => CancelDiscription, nullable: true })
  cancel?: Cancel | null;

  @ApiPropertyOptional({ type: () => UserDiscription, nullable: true })
  user?: User | null;

  @ApiPropertyOptional({ type: () => DeliveryDicription, nullable: true })
  delivery?: Delivery | null;

  @ApiPropertyOptional({ type: () => OrderItem, isArray: true })
  orderItems?: OrderItem[];
}

export class Order
  extends IntersectionType(OrderDiscription, OrderRelation)
  implements IOrder
{
  @ApiProperty({ example: 233.6 })
  totalPrice: number;

  constructor(partial: Partial<Order>) {
    super();

    Object.assign(this, partial);
    if (this.address) {
      this.address = new Address(this.address);
    }
    if (this.cancel) {
      this.cancel = new Cancel(this.cancel);
    }
    if (this.user) {
      this.user = new User(this.user);
    }
    if (this.orderItems?.length) {
      this.orderItems = this.orderItems.map((el) => new OrderItem(el));
    }
    if (this.delivery) {
      this.delivery = new Delivery(this.delivery);
    }
  }
}
