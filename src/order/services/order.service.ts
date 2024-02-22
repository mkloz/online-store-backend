import {
  Injectable,
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
import { FindManyOrdersDto } from '../dto/find-orders.dto';
import { Helper } from '@utils/helpers';

export const COST_FOR_FREE_DELIVERY = 1000;

@Injectable()
export class OrderService {
  private readonly backendUrl: string;
  private readonly responseIncludes: Prisma.OrderInclude = {
    address: true,
    cancel: true,
    delivery: true,
    orderItems: {
      include: {
        article: { include: { images: true, sale: true, categories: true } },
      },
    },
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
  async deleteItem(itemId: number): Promise<Order> {
    const item = await this.prisma.orderItem.findUnique({
      where: { id: itemId },
    });
    if (!item) throw OrderService.badRequest;

    const deleted = await this.prisma.order.update({
      where: { id: item.orderId },
      data: { orderItems: { delete: { id: itemId } } },
      include: { delivery: true },
    });

    if (!deleted) throw OrderService.badRequest;

    const newPrice =
      deleted.totalPrice -
      (deleted.delivery?.shippingCost || 0) -
      item.subtotalPrice;
    const shippingCost =
      newPrice >= COST_FOR_FREE_DELIVERY ? 0 : DEFAULT_SHIPPING_COST;

    const order = await this.prisma.order.update({
      where: { id: deleted.id },
      data: {
        totalPrice: newPrice + shippingCost,
        delivery: { update: { shippingCost: shippingCost } },
      },
      include: this.responseIncludes,
    });

    return new Order(order);
  }

  private async getAddressOrCreate(fields: {
    street: string;
    city: string;
    country: string;
    postCode: string;
  }): Promise<Address> {
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
    if (!cart.totalPrice)
      throw new UnprocessableEntityException('Invalid request');

    const address = await this.getAddressOrCreate({
      street: dto.street,
      city: dto.city,
      postCode: dto.postCode,
      country: dto.country,
    });
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
    await this.cartService.clearByUniqueInput(cart.id);

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

  async findAll(opt: FindManyOrdersDto): Promise<Paginated<Order>> {
    const pag: IPag<Order> = {
      data: await this.findManyOrders(opt, { status: opt.status }),
      count: await this.prisma.order.count({ where: { status: opt.status } }),
      route: `${this.backendUrl}/${GLOBAL_PREFIX}/${Prefix.ORDERS}`,
    };

    return Paginator.paginate(
      pag,
      opt,
      Helper.queryDtoToQuery({ status: opt.status }),
    );
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
