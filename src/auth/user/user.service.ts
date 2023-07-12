import { Injectable } from '@nestjs/common';
import { ID } from 'src/common/common.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/db/prisma.service';
import { Role } from '@prisma/client';

export const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async add({ password, ...dto }: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        password: password
          ? await UserService.hashPassword(password)
          : undefined,
        role: Role.USER,
        ...dto,
      },
    });
  }

  getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  getById(id: ID): Promise<User> {
    return this.prisma.user.findUnique({
      where: id,
    });
  }
}
