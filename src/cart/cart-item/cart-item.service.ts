import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from '@db/prisma.service';
import { CartItem } from './entities/cart-item.entity';
import { IPag, Paginator } from '@shared/pagination';
import { IDDto } from '@shared/dto';
import { ApiConfigService } from '@config/api-config.service';
import { PaginationOptionsDto, Paginated } from '@shared/pagination';
import { ArticleService } from '@article/article.service';

@Injectable()
export class CartItemService {
  private readonly backendUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly articleService: ArticleService,
    private readonly cs: ApiConfigService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }

  static cartItemNotExistException = new UnprocessableEntityException(
    'Item not exist',
  );

  async decrement(user: IDDto, dto: CreateCartItemDto): Promise<CartItem> {
    const userFromDB = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { cart: { include: { cartItems: true } } },
    });
    if (!userFromDB) throw CartItemService.cartItemNotExistException;

    const cartItem = userFromDB.cart?.cartItems?.find(
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
    { id }: IDDto,
    dto: CreateCartItemDto,
  ): Promise<CartItem> {
    const cart = await this.prisma.cart.findUnique({ where: { userId: id } });

    if (!cart) throw new UnprocessableEntityException('Cart not exist');

    const item = await this.prisma.cartItem.create({
      data: {
        ...dto,
        cart: { connect: { id: cart.id } },
        article: { connect: { id: dto.article } },
      },
      include: { article: true },
    });
    if (!item) throw CartItemService.cartItemNotExistException;

    const subtotalPrice =
      (await this.articleService.getArticleActualPrice(item.articleId)) *
      item.quantity;

    return new CartItem({ ...item, subtotalPrice });
  }

  async add(user: IDDto, dto: CreateCartItemDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: user.id },
      include: { cartItems: true },
    });

    if (!cart) throw CartItemService.cartItemNotExistException;

    const cartItem = cart.cartItems?.find((el) => el.articleId === dto.article);

    if (cartItem) {
      return await this.update(cartItem.id, {
        quantity: cartItem.quantity + dto.quantity,
      });
    }
    return await this.create(user, dto);
  }

  async findAll(
    user: IDDto,
    opt: PaginationOptionsDto,
  ): Promise<Paginated<CartItem>> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: user.id },
    });
    if (!cart) throw new NotFoundException('Cart not found');
    const pag: IPag<CartItem> = {
      data: await Promise.all(
        (
          await this.prisma.cartItem.findMany({
            where: { cartId: cart.id },
            take: opt.limit,
            skip: opt.limit * (opt.page - 1),
            include: { article: true },
          })
        ).map(async (el) => {
          const subtotalPrice =
            (await this.articleService.getArticleActualPrice(el.articleId)) *
            el.quantity;

          return new CartItem({ ...el, subtotalPrice });
        }),
      ),
      count: await this.prisma.category.count(),
      route: `${this.backendUrl}/api/users/me/cart`,
    };

    return Paginator.paginate(pag, opt);
  }

  public async findOne(id: number): Promise<CartItem> {
    const item = await this.prisma.cartItem.findUnique({
      where: { id },
      include: { article: true },
    });

    if (!item) throw CartItemService.cartItemNotExistException;

    const subtotalPrice =
      (await this.articleService.getArticleActualPrice(item.articleId)) *
      item.quantity;
    return new CartItem({ ...item, subtotalPrice });
  }

  public async update(id: number, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.update({
      where: { id },
      data: dto,
      include: { article: true },
    });

    if (!item) throw CartItemService.cartItemNotExistException;
    const subtotalPrice =
      (await this.articleService.getArticleActualPrice(item.articleId)) *
      item.quantity;

    return new CartItem({ ...item, subtotalPrice });
  }

  public async remove(id: number): Promise<CartItem> {
    const item = await this.prisma.cartItem.delete({ where: { id } });

    if (!item) throw CartItemService.cartItemNotExistException;
    const subtotalPrice =
      (await this.articleService.getArticleActualPrice(item.articleId)) *
      item.quantity;

    return new CartItem({ ...item, subtotalPrice });
  }
}
