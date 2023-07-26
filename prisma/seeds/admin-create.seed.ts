import { PrismaClient, Provider } from '@prisma/client';
import * as dotenv from 'dotenv';
import { CartService } from '@cart/cart.service';
import { Done } from '@shared/dto';
import { PrismaService } from '@db/prisma.service';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';

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
