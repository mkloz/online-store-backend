import { PrismaClient, Role } from '@prisma/client';
import * as dotenv from 'dotenv';
import { Ok } from 'src/common/dto/ok.dto';
import { UserService } from 'src/user/user.service';

dotenv.config();

export async function createAdmin(prisma: PrismaClient): Promise<Ok> {
  const admin = {
    name: process.env.ADMIN_NAME || '',
    email: process.env.ADMIN_EMAIL || '',
    password: process.env.ADMIN_PASSWORD || '',
  };
  for (const key in Object.keys(admin)) {
    if (!key) throw new Error('Provide env variables!');
  }
  admin.password = await UserService.hashPassword(admin.password);

  await prisma.user.upsert({
    where: { email: admin.email },
    update: { role: Role.ADMIN },
    create: { role: Role.ADMIN, isEmailConfirmed: true, ...admin },
  });

  return new Ok();
}
