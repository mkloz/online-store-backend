import { Module } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from './configs/auth.config';
import { mailConfig } from './configs/mail.config';
import { awsConfig } from './configs/aws.config';
import { onlineStoreConfig } from './configs/online-store.config';
import { mySqlConfig } from './configs/mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig, mailConfig, awsConfig, onlineStoreConfig, mySqlConfig],
    }),
  ],
  exports: [ApiConfigService],
  providers: [ApiConfigService],
})
export class ApiConfigModule {}
