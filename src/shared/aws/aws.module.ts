import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ApiConfigService } from '@config/api-config.service';
import { ApiConfigModule } from '@config/api-config.module';
import { ArticlePhotoS3Service } from './s3/article-photo.service';

@Module({
  imports: [ApiConfigModule],
  providers: [
    {
      provide: S3Client,
      inject: [ApiConfigService],
      useFactory: (cs: ApiConfigService) => {
        const aws = cs.getAWS();
        return new S3Client({
          region: aws.s3.region,
          credentials: {
            accessKeyId: aws.s3.keyId,
            secretAccessKey: aws.s3.secretKey,
          },
        });
      },
    },
    ArticlePhotoS3Service,
  ],
  exports: [ArticlePhotoS3Service],
})
export class AWSModule {}
