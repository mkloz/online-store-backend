import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ApiConfigService } from 'src/config/api-config.service';
import { ApiConfigModule } from 'src/config/api-config.module';
import { FileS3Service } from './file-s3.service';

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
    FileS3Service,
  ],
  exports: [FileS3Service],
})
export class AWSModule {}
