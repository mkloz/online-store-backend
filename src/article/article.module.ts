import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { DbModule } from 'src/db/db.module';
import { MailModule } from 'src/mail/mail.module';
import { ApiConfigModule } from 'src/config/api-config.module';
import { ArticleExistConstraint } from './validators/article-exist.validator';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [DbModule, MailModule, ApiConfigModule, CartModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleExistConstraint],
})
export class ArticleModule {}
