import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApiConfigModule } from './config/api-config.module';
import { CartModule } from './cart/cart.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from './mailer/mailer.module';
import { OrderModule } from './order/order.module';
import { HealthModule } from './health/health.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DataResponseInterceptor, GlobalExceptionFilter } from '@shared/global';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { ApiConfigService } from '@config/api-config.service';
import helmet from 'helmet';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
@Module({
  imports: [
    HealthModule,
    ApiConfigModule,
    ArticleModule,
    ReviewModule,
    UserModule,
    MailerModule,
    OrderModule,
    CartModule,
    AuthModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) =>
        config.getOnlineStore().throttle,
    }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: DataResponseInterceptor },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({ transform: true, validateCustomDecorators: true }),
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(private readonly acs: ApiConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors({ credentials: true }), helmet()).forRoutes('*');
    if (!this.acs.isProduction())
      consumer
        .apply(
          morgan(getMorganCfg(), {
            stream: {
              write: (message) =>
                Logger.log(message.replace('\n', ''), 'Request'),
            },
          }),
        )
        .forRoutes('*');
  }
}

function getMorganCfg(): string {
  return ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms';
}
