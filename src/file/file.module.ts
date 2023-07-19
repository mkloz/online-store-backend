import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { DbModule } from 'src/db/db.module';
import { AWSModule } from './aws/aws.module';
import { ApiConfigModule } from 'src/config/api-config.module';

@Module({
  imports: [ApiConfigModule, DbModule, AWSModule, MulterModule.register()],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
