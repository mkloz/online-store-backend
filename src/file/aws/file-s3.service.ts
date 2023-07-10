import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAWS } from '../../common/config/config';
import { v4 as uuid } from 'uuid';
import { Readable } from 'stream';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class FileS3Service {
  public constructor(
    private readonly configService: ConfigService,
    @Inject(S3Client) private readonly s3: S3Client,
  ) {}

  public async addFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.configService.get<IAWS>('aws').s3.bucketName,
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
        Bucket: this.configService.get<IAWS>('aws').s3.bucketName,
        Key: name,
      }),
    );
  }
}
