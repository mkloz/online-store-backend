import { ApiConfigService } from '@config/api-config.service';
import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import mysqldump, { ConnectionOptions } from 'mysqldump';
import { join } from 'path';
import { gzipSync } from 'zlib';

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
    this.createPath();

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
    this.createPath();

    const data = (
      await mysqldump({
        connection: this.connection,
        dump: {
          schema: false,
          trigger: false,
        },
      })
    ).dump.data;
    if (data) writeFileSync(this.getPath('db-data.gz'), gzipSync(data));
  }

  async downloadTriggers() {
    this.createPath();

    await mysqldump({
      connection: this.connection,
      dump: {
        schema: false,
        data: false,
      },
      dumpToFile: this.getPath('db-triggers.sql'),
    });
  }
  private createPath() {
    if (!existsSync(PATH_TO_BACKUPS)) {
      mkdirSync(PATH_TO_BACKUPS, { recursive: true });
    }
  }
  private getPath(filename: string): string {
    return join(PATH_TO_BACKUPS, filename);
  }
}
