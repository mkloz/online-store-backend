import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ArticlePhotoModule } from './article/article-photos/article-photo.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './article/category/category.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { ApiConfigModule } from './config/api-config.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ApiConfigModule,
    ArticleModule,
    ReviewModule,
    UserModule,
    MailModule,
    CartModule,
    AuthModule,
  ],
})
export class AppModule {}
