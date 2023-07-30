import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Article, ArticleDiscription } from '@article/entities/article.entity';
import { OrderItem as IOrderItem } from '@prisma/client';
import { Order } from '@app/order/entities/order.entity';

export class OrderItemDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1, default: 1 })
  quantity: number;
}
export class OrderItem extends OrderItemDiscription implements IOrderItem {
  @ApiProperty({ example: 9.98 })
  subtotalPrice: number | null;
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article | null;

  // @ApiPropertyOptional({ type: () => OrderDiscription })
  order?: Order | null;

  @Exclude()
  orderId: number | null;
  @Exclude()
  articleId: number | null;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

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
