import { PrismaClient } from '@prisma/client';
import { createAdmin } from './admin-create.seed';
import { Logger } from '@nestjs/common';
import { createCategories } from './categories-add.seed';

const prismaClient = new PrismaClient();

interface Done {
  done: boolean;
}

class Seeder {
  constructor(private readonly prisma: PrismaClient) {}

  async start(): Promise<Done> {
    (await createAdmin(this.prisma)).ok
      ? Logger.log('Admin was created ✔️', 'Seeder')
      : Logger.log('Admin wasn`t created ❌', 'Seeder');
    (await createCategories(this.prisma)).ok
      ? Logger.log('Categories were created ✔️', 'Seeder')
      : Logger.log('Categories weren`t created ❌', 'Seeder');

    return { done: true };
  }
}

new Seeder(prismaClient)
  .start()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
