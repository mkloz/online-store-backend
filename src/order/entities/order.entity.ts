import { OrderStatus } from '@prisma/client';
import { Cancel, CancelDiscription } from './cancel.entity';
import { User, UserDiscription } from '@user/user.entity';
import { OrderItem } from './order-item.entity';
import { Delivery, DeliveryDicription } from './delivery.entity';
import { Order as IOrder } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Address, AddressDicription } from './address.entity';
export class OrderDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 233.6 })
  totalPrice: number | null;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;
}

export class Order extends OrderDiscription implements IOrder {
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  userId: number | null;
  @Exclude()
  addressId: number;

  @ApiPropertyOptional({ type: () => AddressDicription })
  address?: Address;
  @ApiPropertyOptional({ type: () => CancelDiscription })
  cancel?: Cancel | null;
  @ApiPropertyOptional({ type: () => UserDiscription })
  user?: User;
  @ApiPropertyOptional({ type: () => DeliveryDicription })
  delivery?: Delivery | null;
  @ApiPropertyOptional({ type: () => [OrderItem] })
  orderItems?: OrderItem[];

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
