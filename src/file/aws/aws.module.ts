import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/common/configs/config.interface';

@Module({
  providers: [
    {
      provide: S3Client,
      inject: [ConfigService<IConfig>],
      useFactory: (configService: ConfigService<IConfig>) => {
        const aws = configService.get('aws', { infer: true });
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
