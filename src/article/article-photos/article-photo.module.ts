import { Module } from '@nestjs/common';
import { ArticlePhotoService } from './article-photo.service';
import { ArticlePhotoController } from './article-photo.controller';
import { MulterModule } from '@nestjs/platform-express';
import { DbModule } from '@db/db.module';
import { AWSModule } from '@aws/aws.module';
import { ApiConfigModule } from '@config/api-config.module';

@Module({
  imports: [ApiConfigModule, DbModule, AWSModule, MulterModule.register()],
  controllers: [ArticlePhotoController],
  providers: [ArticlePhotoService],
})
export class ArticlePhotoModule {}
