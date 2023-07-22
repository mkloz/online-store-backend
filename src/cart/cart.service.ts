import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { Cart } from './entities/cart.entity';
import { Prisma } from '@prisma/client';
import { Done } from 'src/common/dto/done.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  static cartNotExistException = new NotFoundException('Cart not found');

  async recalculateTotalPrice(cartId: number): Promise<Done> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { cartItems: true },
    });

    if (!cart) {
      throw CartService.cartNotExistException;
    }

    await this.prisma.cart.update({
      where: { id: cartId },
      data: {
        totalPrice: cart.cartItems.reduce(
          (total, item) => total + (item.subtotalPrice || 0),
          0,
        ),
      },
    });

    return new Done();
  }

  async create(userId: number): Promise<Cart> {
    const cart = await this.prisma.cart.create({
      data: { user: { connect: { id: userId } }, totalPrice: 0 },
    });
    if (!cart) throw CartService.cartNotExistException;

    return new Cart(cart);
  }

  async findOne(input: Prisma.CartWhereUniqueInput): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: input,
    });
    if (!cart) throw CartService.cartNotExistException;

    return new Cart(cart);
  }

  async findMany(input: Prisma.CartWhereInput): Promise<Cart[]> {
    const cart = await this.prisma.cart.findMany({
      where: input,
    });
    if (!cart.length) throw CartService.cartNotExistException;

    return cart.map((el) => new Cart(el));
  }
  async clearByUniqueInput(input: Prisma.CartWhereUniqueInput) {
    const cart = await this.prisma.cart.update({
      where: input,
      data: { cartItems: { set: [] }, totalPrice: 0 },
    });
    if (!cart) throw CartService.cartNotExistException;

    return new Cart(cart);
  }
}
