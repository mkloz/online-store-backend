import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Get,
  UploadedFiles,
  ParseFilePipe,
  UseGuards,
  ClassSerializerInterceptor,
  Body,
} from '@nestjs/common';
import { ArticlePhotoService } from './article-photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IDDto } from '@shared/dto';
import { ApiCreateFiles } from './docs/api-create-files.decorator';
import { FilesValidator } from './validators/article-photo.validator';
import { ApiRemoveFile } from './docs/api-remove-file.decorator';
import { ApiGetFile } from './docs/api-get-file.decorator';
import { ApiFile } from './docs/api-file.decorator';
import { RoleAuthGuard } from '@shared/guards';
import { Roles } from '@shared/decorators';
import { Role } from '@prisma/client';
import { ArticlePhoto } from './article-photo.entity';
import { ArticlePhotosUploadDto } from './dto/article-photos-upload.dto';
import { Prefix } from '@utils/prefix.enum';
import { IFile } from './file.interface';

export const ARTICLE_FILES_FIELD = 'files';
export const TEN_MEGABYTES = 10e6;

@ApiFile()
@Controller(Prefix.ARTICLE_PHOTOS)
@UseInterceptors(ClassSerializerInterceptor)
export class ArticlePhotoController {
  public static readonly TYPE_OF_FILES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg',
    'image/svgz',
    'image/webp',
    'image/tiff',
    'image/tif',
    'image/bmp',
  ];
  public static MAX_FILE_SIZE = TEN_MEGABYTES;
  public static MAX_COUNT_FILES = 10;

  public constructor(private readonly fileService: ArticlePhotoService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  @ApiCreateFiles()
  @UseInterceptors(
    FilesInterceptor(
      ARTICLE_FILES_FIELD,
      ArticlePhotoController.MAX_COUNT_FILES,
    ),
  )
  public create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FilesValidator({
            maxSize: ArticlePhotoController.MAX_FILE_SIZE,
            mimetypes: ArticlePhotoController.TYPE_OF_FILES,
          }),
        ],
      }),
    )
    files: IFile[],
    @Body() { articleId }: ArticlePhotosUploadDto,
  ): Promise<ArticlePhoto[]> {
    return this.fileService.add(articleId, files);
  }

  @Get(':id')
  @ApiGetFile()
  public get(@Param() { id }: IDDto): Promise<ArticlePhoto> {
    return this.fileService.getFile(id);
  }

  @Delete(':id')
  @ApiRemoveFile()
  @UseGuards(RoleAuthGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  public remove(@Param() { id }: IDDto): Promise<ArticlePhoto> {
    return this.fileService.remove(id);
  }
}
