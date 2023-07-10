import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvVar } from './common/config/config';
import { FileModule } from './file/file.module';
import { SaleModule } from './sale/sale.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ArticleModule,
    FileModule,
    ConfigModule.forRoot({ isGlobal: true, load: [getEnvVar] }),
    SaleModule,
    ReviewModule,
  ],
})
export class AppModule {}
