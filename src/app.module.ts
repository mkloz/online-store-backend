import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { SaleModule } from './sale/sale.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { authConfig } from './common/configs/auth.config';
import { mailConfig } from './common/configs/mail.config';
import { awsConfig } from './common/configs/aws.config';
import { onlineStoreConfig } from './common/configs/online-store.config';
import { mySqlConfig } from './common/configs/mysql.config';

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
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, mailConfig, awsConfig, onlineStoreConfig, mySqlConfig],
    }),
  ],
})
export class AppModule {}
