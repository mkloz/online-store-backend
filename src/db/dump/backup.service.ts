import { ApiConfigService } from '@config/api-config.service';
import { Injectable } from '@nestjs/common';
import mysqldump, { ConnectionOptions } from 'mysqldump';
import { join } from 'path';

export const PATH_TO_BACKUPS = join(process.cwd(), 'prisma', 'backups');

@Injectable()
export class BackupService {
  private connection: ConnectionOptions;
  private static instance: BackupService;

  constructor(private readonly cs: ApiConfigService) {
    if (BackupService.instance) return BackupService.instance;

    const config = this.cs.getDB();

    this.connection = {
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.databaseName,
      port: config.port,
    };

    BackupService.instance = this;
  }

  async downloadSchema() {
    await mysqldump({
      connection: this.connection,
      dump: {
        data: false,
        trigger: false,
      },
      dumpToFile: this.getPath('db-schema.sql'),
    });
  }

  async downloadData() {
    await mysqldump({
      connection: this.connection,
      dump: {
        schema: false,
        trigger: false,
      },
      compressFile: true,
      dumpToFile: this.getPath('db-data.sql'),
    });
  }

  async downloadTriggers() {
    await mysqldump({
      connection: this.connection,
      dump: {
        schema: false,
        data: false,
      },
      dumpToFile: this.getPath('db-triggers.sql'),
    });
  }

  private getPath(filename: string): string {
    return join(PATH_TO_BACKUPS, filename);
  }
}
