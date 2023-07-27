import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiResponseDataArray } from '@shared/docs';
import { ArticlePhoto } from '../article-photo.entity';
import { ArticlePhotosUploadExtDto } from '../dto/article-photos-upload.dto';

export const ApiCreateFiles = () =>
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Upload file to AWS and save info in db. [open for: ADMIN]',
    }),
    ApiResponseDataArray(ArticlePhoto, HttpStatus.CREATED),
    ApiBody({ type: ArticlePhotosUploadExtDto }),
  );
