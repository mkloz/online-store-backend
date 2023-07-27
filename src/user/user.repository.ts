import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { PrismaService } from '@db/prisma.service';
import { Prisma, Provider, Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Nullable } from '@shared/types/nullable.type';

export const SALT_ROUNDS = 10;

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async verifyByUniqueInput(
    value: Prisma.UserWhereUniqueInput,
  ): Promise<void> {
    await this.prisma.user.update({
      where: value,
      data: { isEmailConfirmed: true },
    });
    return;
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

  public async create(
    dto: CreateUserDto & { provider?: Provider },
  ): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        provider: dto.provider,
        password: dto.password
          ? await UserService.hashPassword(dto.password)
          : undefined,
        role: Role.USER,
        favorites: this.prisma.connectArrayIfDefined(dto.favorites),
      },
      include: { reviews: true, favorites: true, cart: true },
    });
  }

  public async createAdmin(
    dto: CreateUserDto & { provider?: Provider },
  ): Promise<User> {
    return this.prisma.user.upsert({
      where: { email: dto.email },
      update: { role: Role.ADMIN },
      create: {
        name: dto.name,
        email: dto.email,
        provider: dto.provider,
        password: dto.password
          ? await UserService.hashPassword(dto.password)
          : undefined,
        isEmailConfirmed: true,
        favorites: this.prisma.connectArrayIfDefined(dto.favorites),
        role: Role.ADMIN,
      },
      include: { reviews: true, favorites: true, cart: true },
    });
  }

  public async getByUniqueInput(
    value: Prisma.UserWhereUniqueInput & { provider?: Provider } & {
      isEmailConfirmed?: boolean;
    },
  ): Promise<Nullable<User>> {
    return await this.prisma.user.findFirst({
      where: value,
      include: { reviews: true, favorites: true, cart: true },
    });
  }

  public async updateById(
    id: number,
    dto: UpdateUserDto,
  ): Promise<Nullable<User>> {
    return this.prisma.user.update({
      where: { id },
      include: { reviews: true, favorites: true, cart: true },
      data: {
        name: dto.name,
        favorites: this.prisma.setArrayIfDefined(dto.favorites),
      },
    });
  }

  public async deleteById(id: number): Promise<Nullable<User>> {
    return await this.prisma.user.delete({
      where: { id },
      include: { reviews: true, favorites: true, cart: true },
    });
  }
}
