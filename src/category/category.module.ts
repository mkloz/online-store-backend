import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DbModule } from 'src/db/db.module';
import { ApiConfigModule } from 'src/config/api-config.module';
import { CategoryExistConstraint } from './validators/category-exist.validator';

@Module({
  imports: [DbModule, ApiConfigModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryExistConstraint],
})
export class CategoryModule {}
