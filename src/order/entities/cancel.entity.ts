import { Order, OrderDiscription } from './order.entity';
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
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
  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  orderId: number;
}

export class CancelRelation {
  @ApiPropertyOptional({ type: () => OrderDiscription })
  order?: Order;
}
export class Cancel
  extends IntersectionType(CancelDiscription, CancelRelation)
  implements ICancel
{
  constructor(partial: Partial<Cancel>) {
    super();

    Object.assign(this, partial);

    if (this.order) {
      this.order = new Order(this.order);
    }
  }
}
