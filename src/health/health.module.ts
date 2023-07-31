import { Logger, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { DbModule } from '@db/db.module';
import { ApiConfigModule } from '@config/api-config.module';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: Logger,
      errorLogStyle: 'pretty',
    }),
    HttpModule,
    DbModule,
    ApiConfigModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
