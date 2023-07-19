import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { DbModule } from 'src/db/db.module';
import { MailModule } from 'src/mail/mail.module';
import { ApiConfigModule } from 'src/config/api-config.module';

@Module({
  imports: [DbModule, MailModule, ApiConfigModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
