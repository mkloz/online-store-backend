import { PrismaClient, Provider, Role } from '@prisma/client';
import * as dotenv from 'dotenv';
import { CartService } from 'src/cart/cart.service';
import { Done } from 'src/common/dto/done.dto';
import { PrismaService } from 'src/db/prisma.service';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

dotenv.config();

export async function createAdmin(prisma: PrismaClient): Promise<Done> {
  const admin = {
    name: process.env.ADMIN_NAME || '',
    email: process.env.ADMIN_EMAIL || '',
    password: process.env.ADMIN_PASSWORD || '',
  };
  for (const key in Object.keys(admin)) {
    if (!key) throw new Error('Provide env variables!');
  }
  admin.password = await UserService.hashPassword(admin.password);
  const prismaService = new PrismaService();
  await new UserService(
    new UserRepository(prismaService),
    new CartService(prismaService),
  ).createAdmin({ ...admin, provider: Provider.EMAIL });

  return new Done();
}
