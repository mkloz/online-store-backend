import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApiConfigModule } from './config/api-config.module';
import { CartModule } from './cart/cart.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ApiConfigModule,
    ArticleModule,
    ReviewModule,
    UserModule,
    MailerModule,
    CartModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
