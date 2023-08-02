import { Injectable } from '@nestjs/common';
import { MailerService } from '../../mailer/mailer.service';
import { OrderStatus } from '@prisma/client';
import { OrderService } from './order.service';

type OrderStatusHandler = (email: string, orderId: number) => Promise<void>;

@Injectable()
export class OrderMailService {
  private statusRouter: Record<OrderStatus, OrderStatusHandler> = {
    [OrderStatus.CENCELED]: this.sendOrderCanceled,
    [OrderStatus.CREATED]: this.sendOrderCreated,
    [OrderStatus.PROCESSED]: this.sendOrderProcessed,
    [OrderStatus.SENDED]: this.sendOrderSended,
    [OrderStatus.DELIVERED]: this.sendOrderDelivered,
    [OrderStatus.RECEIVED]: this.sendOrderRecieved,
  };

  constructor(
    private readonly mailer: MailerService,
    private readonly orderService: OrderService,
  ) {}

  async sendOrderStatus(
    email: string,
    status: OrderStatus,
    orderId: number,
  ): Promise<void> {
    await this.statusRouter[status].call(this, email, orderId);

    return;
  }

  async sendOrderCreated(email: string, orderId: number): Promise<void> {
    await this.mailer.sendMail({
      to: email,
      subject: 'Order was succesfuly created',
      text: `Order was succesfuly created and now processing. Order id: ${orderId}`,
    });
    return;
  }
  async sendOrderProcessed(email: string, orderId: number): Promise<void> {
    await this.mailer.sendMail({
      to: email,
      subject: 'Order was succesfuly processed',
      text: `Order was succesfuly processed by shop owner. Order id: ${orderId}`,
    });
    return;
  }
  async sendOrderSended(email: string, orderId: number): Promise<void> {
    const order = await this.orderService.findOne(orderId);

    await this.mailer.sendMail({
      to: email,
      subject: 'Order was succesfuly sended',
      text: `Order was succesfuly sended to your address. Order id: ${orderId}. Address:
      -street: ${order.address?.street || ''},
      -city: ${order.address?.city || ''},
      -country: ${order.address?.country || ''},
      -post code: ${order.address?.postCode || ''}`,
    });
    return;
  }
  async sendOrderDelivered(email: string, orderId: number): Promise<void> {
    const order = await this.orderService.findOne(orderId);
    await this.mailer.sendMail({
      to: email,
      subject: 'Order was succesfuly delivered',
      text: `Order was succesfuly delivered to your address. Order id: ${orderId}. Address:
      -street: ${order.address?.street || ''},
      -city: ${order.address?.city || ''},
      -country: ${order.address?.country || ''},
      -post code: ${order.address?.postCode || ''}`,
    });
    return;
  }
  async sendOrderRecieved(email: string, orderId: number): Promise<void> {
    await this.mailer.sendMail({
      to: email,
      subject: 'Order was succesfuly delivered',
      text: `Order was recieved. Order id: ${orderId}. Please leave a review about your expirience`,
    });
    return;
  }

  async sendOrderCanceled(email: string, orderId: number): Promise<void> {
    const order = await this.orderService.findOne(orderId);

    await this.mailer.sendMail({
      to: email,
      subject: 'Order was canceled',
      text: `Order was canceled. Order id: ${orderId}. 
      ${order.cancel?.reason ? `Reason:${order.cancel?.reason}` : ''}
      Please contact to us for more information`,
    });
    return;
  }
}
