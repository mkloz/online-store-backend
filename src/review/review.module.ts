import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { DbModule } from '@db/db.module';
import { ApiConfigModule } from '@config/api-config.module';
import { ReviewExistConstraint } from '../shared/validators/review-exist.validator';

@Module({
  imports: [ApiConfigModule, DbModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewExistConstraint],
})
export class ReviewModule {}
