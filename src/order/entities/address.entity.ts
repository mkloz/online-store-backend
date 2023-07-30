import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Address as IAddress } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Order, OrderDiscription } from './order.entity';

export class AddressDicription {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: '23 Street' })
  street: string;
  @ApiProperty({ example: 'City' })
  city: string;
  @ApiProperty({ example: 'United Kingdom' })
  country: string;
  @ApiProperty({ example: '223324' })
  postCode: string;
}

export class Address extends AddressDicription implements IAddress {
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @ApiPropertyOptional({ type: () => [OrderDiscription] })
  orders?: Order[];

  constructor(partial: Partial<Address>) {
    super();

    Object.assign(this, partial);

    if (this.orders) {
      this.orders = this.orders.map((el) => new Order(el));
    }
  }
}
