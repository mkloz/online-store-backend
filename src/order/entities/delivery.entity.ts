import { Order, OrderDiscription } from '@app/order/entities/order.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Delivery as IDelivery } from '@prisma/client';
import { Exclude } from 'class-transformer';
export const DEFAULT_SHIPPING_COST = 20;

export class DeliveryDicription {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: DEFAULT_SHIPPING_COST })
  shippingCost: number;
  @ApiProperty({ example: 'Be carefull it is a present' })
  addition: string | null;
  @ApiProperty({ example: 1 })
  sendedAt: Date | null;
  @ApiProperty({ example: 1 })
  deliveredAt: Date | null;
}
export class Delivery extends DeliveryDicription implements IDelivery {
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  orderId: number;

  @ApiPropertyOptional({ type: () => OrderDiscription })
  order?: Order;

  constructor(partial: Partial<Delivery>) {
    super();

    Object.assign(this, partial);

    if (this.order) {
      this.order = new Order(this.order);
    }
  }
}
