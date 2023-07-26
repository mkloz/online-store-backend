import { createAdmin } from './admin-create.seed';
import { Logger } from '@nestjs/common';
import { createCategories } from './categories-add.seed';
import { AppModule } from '@app/app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { UserService } from '@user/user.service';
import { PrismaService } from '@db/prisma.service';
import { ApiConfigService } from '@config/api-config.service';

interface Done {
  done: boolean;
}

class Seeder {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly acs: ApiConfigService,
  ) {}

  async start(): Promise<Done> {
    (await createAdmin(this.userService, this.acs)).done
      ? Logger.log('Admin was created ✔️', 'Seeder')
      : Logger.log('Admin wasn`t created ❌', 'Seeder');
    (await createCategories(this.prisma)).done
      ? Logger.log('Categories were created ✔️', 'Seeder')
      : Logger.log('Categories weren`t created ❌', 'Seeder');

    return { done: true };
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const prismaService = app.get(PrismaService);
  const userService = app.get(UserService);
  const acs = app.get(ApiConfigService);

  new Seeder(prismaService, userService, acs)
    .start()
    .then(async () => {
      app.close();
    })
    .catch(async (e) => {
      console.error(e);
      await prismaService.$disconnect();
      app.close();
      process.exit(1);
    });
}

bootstrap();
