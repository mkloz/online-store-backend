import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvVar } from './common/config/config';
import { FileModule } from './file/file.module';
import { SaleModule } from './sale/sale.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    FileModule,
    ArticleModule,
    SaleModule,
    ReviewModule,
    CategoryModule,
    ConfigModule.forRoot({ isGlobal: true, load: [getEnvVar] }),
  ],
})
export class AppModule {}
