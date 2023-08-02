import { createAdmin } from './admin-create.seed';
import { Logger } from '@nestjs/common';
import { createCategories } from './categories-add.seed';
import { AppModule } from '@app/app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { UserService } from '@user/services/user.service';
import { PrismaService } from '@db/prisma.service';
import { ApiConfigService } from '@config/api-config.service';
import { createArticles } from './create-articles.seed';
import { ArticleService } from '@article/article.service';
import { ArticlePhotoService } from '@article/article-photos/article-photo.service';
import { SaleService } from '@article/sale/services/sale.service';
import { CategoryService } from '@article/category/category.service';
import { Done } from '@shared/dto';

class Seeder {
  private logger = new Logger('Seeder');

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly acs: ApiConfigService,
    private readonly articleService: ArticleService,
    private readonly saleService: SaleService,
    private readonly categoryService: CategoryService,
    private readonly articlePhotoService: ArticlePhotoService,
  ) {}

  async start(): Promise<Done> {
    (await createAdmin(this.userService, this.acs)).done
      ? this.logger.log('Admin was created ✔️')
      : this.logger.log('Admin wasn`t created ❌');
    (await createCategories(this.prisma)).done
      ? this.logger.log('Categories were created ✔️')
      : this.logger.log('Categories weren`t created ❌');
    (
      await createArticles(
        this.articleService,
        this.saleService,
        this.categoryService,
        this.articlePhotoService,
      )
    ).done
      ? this.logger.log('Articles were created ✔️')
      : this.logger.log('Articles weren`t created ❌');

    return new Done();
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const prismaService = app.get(PrismaService);
  const userService = app.get(UserService);
  const acs = app.get(ApiConfigService);
  const art = app.get(ArticleService);
  const sale = app.get(SaleService);
  const category = app.get(CategoryService);
  const file = app.get(ArticlePhotoService);

  new Seeder(prismaService, userService, acs, art, sale, category, file)
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
