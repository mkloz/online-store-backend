import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { DbModule } from 'src/db/db.module';
import { ApiConfigModule } from 'src/config/api-config.module';
import { ReviewExistConstraint } from './validators/review-exist.validator';

@Module({
  imports: [ApiConfigModule, DbModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewExistConstraint],
})
export class ReviewModule {}
