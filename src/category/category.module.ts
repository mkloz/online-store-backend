import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DbModule } from 'src/db/db.module';
import { ApiConfigModule } from 'src/config/api-config.module';

@Module({
  imports: [DbModule, ApiConfigModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
