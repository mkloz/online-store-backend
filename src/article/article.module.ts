import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { DbModule } from '@db/db.module';
import { MailModule } from '@mail/mail.module';
import { ApiConfigModule } from '@config/api-config.module';
import { ArticleExistConstraint } from '@shared/validators';
import { CartModule } from '@cart/cart.module';
import { SaleModule } from './sale/sale.module';
import { ArticlePhotoModule } from './article-photos/article-photo.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    DbModule,
    MailModule,
    SaleModule,
    ArticlePhotoModule,
    CategoryModule,
    ApiConfigModule,
    CartModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleExistConstraint],
})
export class ArticleModule {}
