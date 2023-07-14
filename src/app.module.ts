import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvVar } from './common/config/config';
import { FileModule } from './file/file.module';
import { SaleModule } from './sale/sale.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    FileModule,
    AuthModule,
    ArticleModule,
    SaleModule,
    ReviewModule,
    CategoryModule,
    UserModule,
    MailModule,
    ConfigModule.forRoot({ isGlobal: true, load: [getEnvVar] }),
  ],
})
export class AppModule {}
