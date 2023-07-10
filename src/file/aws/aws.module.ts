import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { IAWS } from 'src/common/config/config';

@Module({
  providers: [
    {
      provide: S3Client,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const aws = configService.get<IAWS>('aws');
        return new S3Client({
          region: aws.s3.region,
          credentials: {
            accessKeyId: aws.s3.keyId,
            secretAccessKey: aws.s3.secretKey,
          },
        });
      },
    },
  ],
  exports: [S3Client],
})
export class AWSModule {}
