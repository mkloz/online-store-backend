import { Order, OrderDiscription } from './order.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Cancel as ICancel } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CancelDiscription {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Bad address' })
  reason: string;
  // @ApiProperty({ example: true })
  // isMoneyReturned: boolean;
  // @ApiProperty({ example: 233.6 })
  // amountReturned: number | null;
}
export class Cancel extends CancelDiscription implements ICancel {
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  orderId: number;

  @ApiPropertyOptional({ type: () => OrderDiscription })
  order?: Order;

  constructor(partial: Partial<Cancel>) {
    super();

    Object.assign(this, partial);

    if (this.order) {
      this.order = new Order(this.order);
    }
  }
}
