import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAWS, IConfig } from '../../common/configs/config.interface';
import { v4 as uuid } from 'uuid';
import { Readable } from 'stream';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class FileS3Service {
  private readonly aws: IAWS;

  public constructor(
    private readonly configService: ConfigService<IConfig>,
    @Inject(S3Client) private readonly s3: S3Client,
  ) {
    this.aws = this.configService.get('aws', { infer: true });
  }

  public async addFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.aws.s3.bucketName,
      Body: Readable.from(file.buffer),
      Key: `${uuid()}-${file.originalname}`,
      ContentDisposition: 'inline',
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    await new Upload({ client: this.s3, params }).done();

    return {
      name: params.Key,
      url: `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`,
    };
  }

  public async removeFile(name: string) {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.aws.s3.bucketName,
        Key: name,
      }),
    );
  }
}
