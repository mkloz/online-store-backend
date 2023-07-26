import { Module } from '@nestjs/common';
import { ArticlePhotoService } from './article-photo.service';
import { ArticlePhotoController } from './article-photo.controller';
import { MulterModule } from '@nestjs/platform-express';
import { DbModule } from '@db/db.module';
import { AWSModule } from '@shared/aws/aws.module';
import { ApiConfigModule } from '@config/api-config.module';
import { FileExistConstraint } from '@shared/validators';

@Module({
  imports: [ApiConfigModule, DbModule, AWSModule, MulterModule.register()],
  controllers: [ArticlePhotoController],
  providers: [ArticlePhotoService, FileExistConstraint],
})
export class ArticlePhotoModule {}
