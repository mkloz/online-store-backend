import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/db/prisma.service';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

export const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  public async add({
    password,
    reviews,
    ...dto
  }: CreateUserDto): Promise<User> {
    return new User(
      await this.prisma.user.create({
        data: {
          password: password
            ? await UserService.hashPassword(password)
            : undefined,
          role: Role.USER,
          ...dto,
          reviews: {
            connect: reviews.map((id) => ({ id })),
          },
        },
        include: { reviews: true },
      }),
    );
  }

  public async getByEmail(email: string): Promise<User> {
    return new User(
      await this.prisma.user.findUnique({
        where: { email },
        include: { reviews: true },
      }),
    );
  }

  public async getById(id: number): Promise<User> {
    return new User(
      await this.prisma.user.findUnique({
        where: { id },
        include: { reviews: true },
      }),
    );
  }

  public async updateById(
    id: number,
    { reviews, ...dto }: UpdateUserDto,
  ): Promise<User> {
    return new User(
      await this.prisma.user.update({
        where: { id },
        include: { reviews: true },
        data: {
          ...dto,
          reviews: {
            connect: reviews.map((id) => ({ id })),
          },
        },
      }),
    );
  }
  public async deleteById(id: number): Promise<User> {
    return new User(
      await this.prisma.user.delete({
        where: { id },
        include: { reviews: true },
      }),
    );
  }
}
