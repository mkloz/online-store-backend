import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { PrismaService } from 'src/db/prisma.service';
import { Prisma, Provider, Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Nullable } from 'src/common/common.interface';

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

  public async add({
    password,
    favorites,
    ...dto
  }: CreateUserDto & { provider?: Provider }): Promise<User> {
    return await this.prisma.user.create({
      data: {
        ...dto,
        password: password
          ? await UserService.hashPassword(password)
          : undefined,
        role: Role.USER,
        favorites: this.prisma.connectArrayIfDefined(favorites),
      },
      include: { reviews: true, favorites: true },
    });
  }

  public createAdmin({
    favorites,
    ...dto
  }: CreateUserDto & { provider?: Provider }): Promise<User> {
    return this.prisma.user.upsert({
      where: { email: dto.email },
      update: { role: Role.ADMIN },
      create: {
        ...dto,
        favorites: this.prisma.connectArrayIfDefined(favorites),
      },
      include: { reviews: true, favorites: true },
    });
  }

  public async getByUniqueInput(
    value: Prisma.UserWhereUniqueInput & { provider?: Provider } & {
      verified?: boolean;
    },
  ): Promise<Nullable<User>> {
    return await this.prisma.user.findUnique({
      where: value,
      include: { reviews: true, favorites: true },
    });
  }

  public async updateById(
    id: number,
    { favorites, ...dto }: UpdateUserDto,
  ): Promise<Nullable<User>> {
    return this.prisma.user.update({
      where: { id },
      include: { reviews: true, favorites: true },
      data: {
        ...dto,
        favorites: this.prisma.setArrayIfDefined(favorites),
      },
    });
  }

  public async deleteById(id: number): Promise<Nullable<User>> {
    return await this.prisma.user.delete({
      where: { id },
      include: { reviews: true, favorites: true },
    });
  }
}
