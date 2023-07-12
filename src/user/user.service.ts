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

  async add({ password, reviews, ...dto }: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
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
    });
  }

  getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { reviews: true },
    });
  }

  getById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { reviews: true },
    });
  }
  updateById(id: number, { reviews, ...dto }: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      include: { reviews: true },
      data: {
        ...dto,
        reviews: {
          connect: reviews.map((id) => ({ id })),
        },
      },
    });
  }
  deleteById(id: number) {
    return this.prisma.user.delete({
      where: { id },
      include: { reviews: true },
    });
  }
}
