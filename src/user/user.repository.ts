import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { PrismaService } from '@db/prisma.service';
import { Prisma, Provider, Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './services/user.service';
import { Nullable } from '@shared/types/nullable.type';
import { Address } from '@app/order/entities/address.entity';

export const SALT_ROUNDS = 10;

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  public getCount(args: Prisma.UserCountArgs) {
    return this.prisma.user.count(args);
  }
  public async verifyByUniqueInput(
    value: Prisma.UserWhereUniqueInput,
  ): Promise<void> {
    await this.prisma.user.update({
      where: value,
      data: { isEmailConfirmed: true },
    });
    return;
  }
  public async getMany(args: Prisma.UserFindManyArgs): Promise<User[]> {
    return await this.prisma.user.findMany(args);
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
      },
      include: { favorites: true, cart: true, address: true },
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
        role: Role.ADMIN,
      },
      include: { favorites: true, cart: true, address: true },
    });
  }

  public async getByUniqueInput(
    value: Prisma.UserWhereUniqueInput & { provider?: Provider } & {
      isEmailConfirmed?: boolean;
    },
  ): Promise<Nullable<User>> {
    return await this.prisma.user.findFirst({
      where: value,
      include: { favorites: true, cart: true, address: true },
    });
  }

  public async updateById(
    id: number,
    dto: UpdateUserDto,
  ): Promise<Nullable<User>> {
    let address: Address | null | undefined;

    if (dto.street && dto.city && dto.country && dto.postCode) {
      address = await this.getAddressOrCreate({
        street: dto.street,
        city: dto.city,
        postCode: dto.postCode,
        country: dto.country,
      });
    }

    return await this.prisma.user.update({
      where: { id },
      include: { favorites: true, cart: true, address: true },
      data: {
        name: dto.name,
        phoneNumber: dto.phoneNumber,
        addressId: address ? address.id : undefined,
      },
    });
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
  public async addToFavorites(
    userId: number,
    articleId: number,
  ): Promise<Nullable<User>> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { favorites: { connect: { id: articleId } } },
      include: { favorites: true, cart: true, address: true },
    });
  }
  public async removeFromFavorites(userId: number, articleId: number) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { favorites: { disconnect: { id: articleId } } },
      include: { favorites: true, cart: true, address: true },
    });
  }

  public async deleteById(id: number): Promise<Nullable<User>> {
    return await this.prisma.user.delete({
      where: { id },
      include: { favorites: true, cart: true, address: true },
    });
  }
}
