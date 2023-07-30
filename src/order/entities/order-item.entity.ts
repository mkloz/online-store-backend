import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Article, ArticleDiscription } from '@article/entities/article.entity';
import { OrderItem as IOrderItem } from '@prisma/client';
import { Order } from '@app/order/entities/order.entity';

export class OrderItemDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1, default: 1 })
  quantity: number;

  @Exclude()
  orderId: number;

  @Exclude()
  articleId: number | null;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

export class OrderItemRelation {
  @ApiPropertyOptional({ type: () => ArticleDiscription, nullable: true })
  article?: Article | null;

  // @ApiPropertyOptional({ type: () => OrderDiscription })
  order?: Order;
}

export class OrderItem
  extends IntersectionType(OrderItemDiscription, OrderItemRelation)
  implements IOrderItem
{
  @ApiProperty({ example: 9.98 })
  subtotalPrice: number;

  constructor(partial: Partial<OrderItem>) {
    super();

    Object.assign(this, partial);

    if (this.article) {
      this.article = new Article(this.article);
    }
    if (this.order) {
      this.order = new Order(this.order);
    }
  }
}
