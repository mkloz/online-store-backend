import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileS3Service } from './aws/file-s3.service';
import { DbModule } from 'src/db/db.module';
import { AWSModule } from './aws/aws.module';

@Module({
  imports: [DbModule, AWSModule, MulterModule.register()],
  controllers: [FileController],
  providers: [FileService, FileS3Service],
})
export class FileModule {}
