import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DbCronService } from './db-cron.service';
import { BackupService } from './dump/backup.service';
import { ApiConfigModule } from '@config/api-config.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ApiConfigModule, ScheduleModule],
  exports: [PrismaService],
  providers: [PrismaService, DbCronService, BackupService],
})
export class DbModule implements OnApplicationBootstrap {
  constructor(private readonly backup: BackupService) {}

  async onApplicationBootstrap() {
    await this.backup.downloadSchema();
  }
}
