import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/db/prisma.service';
import { Provider, Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

export const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
  public async verifyByID(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { isEmailConfirmed: true },
    });
    return;
  }
  public verifyByEmail(email: string): Promise<User> {
    return this.prisma.user.update({
      where: { email },
      data: { isEmailConfirmed: true },
    });
  }
  public async changePassword(
    id: number,
    password: string,
    provider: Provider,
  ) {
    if (provider == Provider.EMAIL) {
      return await this.prisma.user.update({
        where: { id },
        data: { password: await UserService.hashPassword(password) },
      });
    }
    throw new UnprocessableEntityException('Incorect provider');
  }

  public async add({
    password,
    reviews,
    ...dto
  }: CreateUserDto & { provider?: Provider }): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        password: password
          ? await UserService.hashPassword(password)
          : undefined,
        role: Role.USER,
        ...dto,
        reviews: reviews
          ? {
              connect: reviews.map((id) => ({ id })),
            }
          : undefined,
      },
      include: { reviews: true },
    });
    return user ? new User(user) : null;
  }
  public async getByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { reviews: true },
    });
    return user ? new User(user) : null;
  }

  public async getByEmailAndProvider(
    email: string,
    provider: Provider,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email, provider },
      include: { reviews: true },
    });
    return user ? new User(user) : null;
  }

  public async getByEmailVerified(
    email: string,
    provider: Provider,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email, provider },
      include: { reviews: true },
    });

    if (user && !user.isEmailConfirmed) {
      throw new UnprocessableEntityException('Email is not confirmed');
    }
    return user ? new User(user) : null;
  }
  public async getByEmailUnverified(
    email: string,
    provider: Provider,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email, isEmailConfirmed: false, provider },
      include: { reviews: true },
    });

    return user ? new User(user) : user;
  }
  public async getById(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id, isEmailConfirmed: true },
      include: { reviews: true },
    });

    return user ? new User(user) : null;
  }

  public async getByIdAndProvider(
    id: number,
    provider: Provider,
  ): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id, isEmailConfirmed: true, provider },
      include: { reviews: true },
    });

    return user ? new User(user) : null;
  }

  public async updateById(
    id: number,
    { reviews, ...dto }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      include: { reviews: true },
      data: {
        ...dto,
        reviews: reviews
          ? {
              connect: reviews.map((id) => ({ id })),
            }
          : undefined,
      },
    });
    return user ? new User(user) : null;
  }
  public async deleteById(id: number): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
      include: { reviews: true },
    });
    return user ? new User(user) : null;
  }
}
