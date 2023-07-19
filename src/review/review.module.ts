import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { DbModule } from 'src/db/db.module';
import { ApiConfigModule } from 'src/config/api-config.module';

@Module({
  imports: [ApiConfigModule, DbModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
