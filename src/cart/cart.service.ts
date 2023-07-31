import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@db/prisma.service';
import { Cart } from './cart.entity';
import { Prisma } from '@prisma/client';
import { ArticleService } from '@article/article.service';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly articleService: ArticleService,
  ) {}
  static cartNotExistException = new NotFoundException('Cart not found');

  async calculateTotalPrice(cartId: number): Promise<number> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { cartItems: true },
    });

    if (!cart) {
      throw CartService.cartNotExistException;
    }

    let totalPrice = 0;

    for (const item of cart.cartItems || []) {
      const actualPrice = await this.articleService.getArticleActualPrice(
        item.articleId,
      );
      totalPrice += actualPrice * item.quantity;
    }

    return totalPrice;
  }

  async create(userId: number): Promise<Cart> {
    const cart = await this.prisma.cart.create({
      data: { user: { connect: { id: userId } } },
    });
    if (!cart) throw CartService.cartNotExistException;

    return new Cart(cart);
  }

  async findOne(input: Prisma.CartWhereUniqueInput): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: input,
      include: { cartItems: true },
    });
    if (!cart) throw CartService.cartNotExistException;

    if (cart.cartItems) {
      cart.cartItems = await Promise.all(
        cart.cartItems.map(async (item) => ({
          ...item,
          subtotalPrice: item.articleId
            ? (await this.articleService.getArticleActualPrice(
                item.articleId,
              )) * item.quantity
            : null,
        })),
      );
    }

    return new Cart({
      ...cart,
      totalPrice: await this.calculateTotalPrice(cart.id),
    });
  }

  async clearByUniqueInput(input: Prisma.CartWhereUniqueInput) {
    const cart = await this.prisma.cart.update({
      where: input,
      data: { cartItems: { set: [] } },
    });
    if (!cart) throw CartService.cartNotExistException;

    return new Cart({
      ...cart,
      totalPrice: await this.calculateTotalPrice(cart.id),
    });
  }
}
