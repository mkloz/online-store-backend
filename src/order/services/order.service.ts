import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { StatusInput } from '../dto/update-order-status.dto';
import { Paginated, PaginationOptionsDto } from '@shared/dto';
import { CancelOrderDto } from '../dto/cancel-order.dto';
import { Address } from '../entities/address.entity';
import { DEFAULT_SHIPPING_COST, Delivery } from '../entities/delivery.entity';
import { Cart } from '@cart/cart.entity';
import { OrderStatus, Prisma } from '@prisma/client';
import { PrismaService } from '@db/prisma.service';
import { CartService } from '@cart/cart.service';
import { CartItem } from '@cart/cart-item/cart-item.entity';
import { Order } from '../entities/order.entity';
import { ApiConfigService } from '@config/api-config.service';
import { IPag, Paginator } from '@shared/pagination';
import { GLOBAL_PREFIX, Prefix } from '@utils/prefix.enum';

export const COST_FOR_FREE_DELIVERY = 1000;

@Injectable()
export class OrderService {
  private readonly backendUrl: string;
  private readonly responseIncludes = {
    address: true,
    cancel: true,
    delivery: true,
    orderItems: { include: { article: true } },
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
    private readonly cs: ApiConfigService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }
  static badRequest = new UnprocessableEntityException('Invalid request');

  cancel(id: number, dto: CancelOrderDto): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.CENCELED,
        cancel: { create: { reason: dto.reason } },
      },
      include: this.responseIncludes,
    });
  }

  private async getAddressOrCreate(fields: {
    street: string;
    city: string;
    country: string;
    postCode: string;
  }): Promise<Address> {
    fields = {
      street: fields.street,
      city: fields.city,
      country: fields.country,
      postCode: fields.postCode,
    };

    const address = await this.prisma.address.findFirst({
      where: fields,
    });

    if (address) return address;

    return await this.prisma.address.create({
      data: fields,
    });
  }

  private getOrderItemsCreateMany(cartItems: CartItem[] | undefined) {
    if (!cartItems?.length) return undefined;

    return {
      createMany: {
        data: cartItems.map((el) => ({
          quantity: el.quantity,
          subtotalPrice: el.subtotalPrice || 0,
          articleId: el.articleId,
        })),
      },
    };
  }

  async create(dto: CreateOrderDto, cart: Cart) {
    if (!cart.totalPrice) throw OrderService.badRequest;

    const address = await this.getAddressOrCreate(dto);
    const delivery = new Delivery({
      addition: dto.addition,
      shippingCost:
        cart.totalPrice >= COST_FOR_FREE_DELIVERY ? 0 : DEFAULT_SHIPPING_COST,
    });

    const order = await this.prisma.order.create({
      data: {
        status: OrderStatus.CREATED,
        totalPrice: cart.totalPrice + delivery.shippingCost,
        userId: cart.userId ?? undefined,
        delivery: { create: delivery },
        addressId: address.id,
        orderItems: this.getOrderItemsCreateMany(cart.cartItems),
      },
      include: this.responseIncludes,
    });
    await this.cartService.clearByUniqueInput({ id: cart.id });

    if (!order) throw new InternalServerErrorException();

    return new Order(order);
  }
  async findManyOrders(
    opt: PaginationOptionsDto,
    input?: Prisma.OrderWhereInput,
  ) {
    return await Promise.all(
      (
        await this.prisma.order.findMany({
          where: input,
          take: opt.limit,
          skip: opt.limit * (opt.page - 1),
          include: this.responseIncludes,
        })
      ).map(async (el) => new Order(el)),
    );
  }

  async findMany(
    opt: PaginationOptionsDto,
    input?: Prisma.OrderWhereInput,
  ): Promise<Paginated<Order>> {
    const pag: IPag<Order> = {
      data: await this.findManyOrders(opt, input),
      count: await this.prisma.order.count({ where: input }),
      route: `${this.backendUrl}/${GLOBAL_PREFIX}/${Prefix.ORDERS}`,
    };

    return Paginator.paginate(pag, opt);
  }

  async findAll(opt: PaginationOptionsDto): Promise<Paginated<Order>> {
    return this.findMany(opt);
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: this.responseIncludes,
    });
    if (!order) throw new NotFoundException('Order not found');

    return new Order(order);
  }
  private isSended(status: OrderStatus): boolean {
    return status === OrderStatus.SENDED;
  }
  private isDelivered(status: OrderStatus): boolean {
    return status === OrderStatus.DELIVERED;
  }
  updateStatus(id: number, status: StatusInput) {
    return this.prisma.order.update({
      where: { id },
      data: {
        status,
        delivery: {
          update: {
            sendedAt: this.isSended(status) ? new Date() : undefined,
            deliveredAt: this.isDelivered(status) ? new Date() : undefined,
          },
        },
      },
      include: this.responseIncludes,
    });
  }
}
