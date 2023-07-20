import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { PrismaService } from 'src/db/prisma.service';
import { CartItem } from './entities/cart-item.entity';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { IPag, Paginator } from 'src/common/pagination/paginator.sevice';
import { Paginated } from 'src/common/pagination/paginated.dto';
import { ApiConfigService } from 'src/config/api-config.service';
@Injectable()
export class CartItemService {
  private readonly backendUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cs: ApiConfigService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }

  async decrement(user: JwtPayload, dto: CreateCartItemDto): Promise<CartItem> {
    const userFromDB = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { cartItems: true },
    });
    const cartItem = userFromDB.cartItems?.find(
      (el) => el.articleId === dto.article,
    );

    if (!cartItem) {
      throw new NotFoundException('Item not found');
    }
    const quantity = cartItem.quantity - dto.quantity;

    return quantity > 0
      ? this.update(cartItem.id, {
          quantity: cartItem.quantity - dto.quantity,
        })
      : this.remove(cartItem.id);
  }

  public async create(
    { id }: JwtPayload,
    dto: CreateCartItemDto,
  ): Promise<CartItem> {
    const item = await this.prisma.cartItem.create({
      data: {
        ...dto,
        user: { connect: { id } },
        article: { connect: { id: dto.article } },
      },
      include: { user: true, article: true },
    });

    return item ? new CartItem(item) : null;
  }

  async add(user: JwtPayload, dto: CreateCartItemDto) {
    const userFromDB = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { cartItems: true },
    });
    const cartItem = userFromDB.cartItems?.find(
      (el) => el.articleId === dto.article,
    );

    if (cartItem) {
      return this.update(cartItem.id, {
        quantity: cartItem.quantity + dto.quantity,
      });
    }

    return this.create(user, dto);
  }

  async findAll(
    user: JwtPayload,
    opt: PaginationOptionsDto,
  ): Promise<Paginated<CartItem>> {
    const pag: IPag<CartItem> = {
      data: (
        await this.prisma.cartItem.findMany({
          where: { user: { id: user.id } },
          take: opt.limit,
          skip: opt.limit * (opt.page - 1),
          include: { article: true },
        })
      ).map((el) => new CartItem(el)),
      count: await this.prisma.category.count(),
      route: `${this.backendUrl}/api/users/me/cart`,
    };

    return Paginator.paginate(pag, opt);
  }

  public async findOne(id: number): Promise<CartItem> {
    const item = await this.prisma.cartItem.findUnique({
      where: { id },
      include: { user: true, article: true },
    });

    return item ? new CartItem(item) : null;
  }

  public async update(id: number, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.update({
      where: { id },
      data: dto,
      include: { user: true, article: true },
    });

    return item ? new CartItem(item) : null;
  }

  public async remove(id: number): Promise<CartItem> {
    const item = await this.prisma.cartItem.delete({ where: { id } });

    return item ? new CartItem(item) : null;
  }
}
