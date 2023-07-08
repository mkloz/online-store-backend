import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvVar } from './common/config/config';

@Module({
  imports: [
    ArticleModule,
    ConfigModule.forRoot({ isGlobal: true, load: [getEnvVar] }),
  ],
})
export class AppModule {}
